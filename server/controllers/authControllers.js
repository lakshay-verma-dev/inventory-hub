const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { ObjectId } = require("mongodb");
require("dotenv").config();
const User = require("../models/user")

const saltRounds = 10;
const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

// Set up the mail transporter for sending OTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function signup(req, res, userCollections) {
  const data = req.body;
  const result = await userCollections.insertOne(data)
  res.send(result);
}

// Signup Controller
async function signup(req, res, userCollections) {
  try {
    const { firstName, lastName, email, password } = req.body;

    const user = await userCollections.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    // Hash the password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, saltRounds);
    } catch (error) {
      console.error("Error hashing password:", error);
      return res.status(500).json({ msg: "Error processing password" });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const newUser = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      otp,
      isVerified: false,
    };

    // Send OTP email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}`,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ msg: "Error sending OTP email" });
    }

    // Insert new user
    try {
      await userCollections.insertOne(newUser);
      res.status(201).json({ msg: "User registered, OTP sent to email" });
    } catch (error) {
      console.error("Error inserting new user:", error);
      res.status(500).json({ msg: "Error saving user data" });
    }
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

// Verify OTP Controller
const verifyOtp = async (req, res, userCollections) => {
  try {
    const { email, otp } = req.body;

    const user = await userCollections.findOne({ email });
    if (!user || user.otp !== otp)
      return res.status(400).json({ msg: "Invalid OTP" });

    await userCollections.updateOne(
      { email },
      { $set: { isVerified: true }, $unset: { otp: "" } }
    );
    res.json({ msg: "User verified" });
  } catch (error) {
    console.error("Verify OTP Error:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

// Login Controller
const login = async (req, res, userCollections) => {
  try {
    const { email, password } = req.body;

    const user = await userCollections.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User does not exist" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    if (!user.isVerified)
      return res.status(400).json({ msg: "Please verify your account first" });

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

// Forgot Password Controller
const forgotPassword = async (req, res, userCollections) => {
  try {
    const { email } = req.body;

    const user = await userCollections.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User does not exist" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await userCollections.updateOne({ email }, { $set: { otp } });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset Password OTP",
      text: `Your OTP code to reset password is ${otp}`,
    };
    await transporter.sendMail(mailOptions);

    res.json({ msg: "OTP sent to email" });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

// Reset Password Controller
const resetPassword = async (req, res, userCollections) => {
  try {
    const { email, otp, newPassword } = req.body;

    const user = await userCollections.findOne({ email });
    if (!user || user.otp !== otp)
      return res.status(400).json({ msg: "Invalid OTP" });

    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    await userCollections.updateOne(
      { email },
      { $set: { password: hashedPassword }, $unset: { otp: "" } }
    );

    res.json({ msg: "Password reset successfully" });
  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

// Logout Controller
const logout = (req, res) => {
  // Implement your logout logic here (e.g., destroying JWT token on the client-side)
  res.json({ msg: "Logged out successfully" });
};

module.exports = {
  signup,
  login,
  logout,
  forgotPassword,
  resetPassword,
  verifyOtp,
};
