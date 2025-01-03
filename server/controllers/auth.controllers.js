import { generateToken } from "../utils/jwt.js";
import sendEmail from "../utils/email.js";
import User from "../models/auth.models.js";

const generateOTP = () => Math.floor(100000 + Math.random() * 900000);

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "User already exists" });

    const otp = generateOTP();
    const otpExpiresAt = Date.now() + 5 * 60 * 1000;
    
    await sendEmail(
      email,
      "Your OTP for Verification",
      `Your OTP is ${otp}. It will expire in 5 minutes.`
    );
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      otp,
      otpExpiresAt,
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Registration failed" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = generateToken(user);
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Login failed" });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    await sendEmail(email, "Password Reset OTP", `Your OTP: ${otp}`);
    res.status(200).json({ message: "OTP sent to email" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ error: "Failed to send OTP" });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ error: "Email and OTP are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if OTP is valid
    if (user.otp !== parseInt(otp) || Date.now() > user.otpExpiresAt) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    user.otp = null;
    user.otpExpiresAt = null;
    await user.save();
    const token = generateToken(user);
    res.status(200).json({ message: "Verification successful", token });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ error: "Verification failed" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    user.password = newPassword;
    user.otp = undefined;
    user.otpExpiresAt = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ error: "Password reset failed" });
  }
};

export { register, login, verifyOtp, resetPassword, forgotPassword };
