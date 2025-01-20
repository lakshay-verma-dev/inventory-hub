import { generateToken } from "../utils/jwt.js";
import sendEmail from "../utils/email.js";
import User from "../models/auth.models.js";
import { v4 as uuidv4 } from "uuid";

// Generate a random 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000);

// In-memory store for OTPs (should use a database or cache like Redis in production)
const otpStore = new Map();

/**
 * Register a new user by sending an OTP for verification.
 */
const register = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Check if email already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    const otp = generateOTP();
    const otpExpiresAt = Date.now() + 5 * 60 * 1000; // OTP expires in 5 minutes

    otpStore.set(email, { otp, otpExpiresAt });

    // Send OTP email
    await sendEmail(
      email,
      "Your One-Time Password (OTP) for Verification",
      `
  Dear User,

  Thank you for using Book Inventory!

  Your One-Time Password (OTP) for verification is: ${otp}

  This OTP is valid for the next 5 minutes. Please use it promptly to complete your verification process.

  If you did not request this verification, please ignore this email or contact our support team immediately.

  Best regards,  
  The Book Inventory Team
  `
    );

    res.status(200).json({ message: "OTP sent to email" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Failed to send OTP" });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp, firstName, lastName, password } = req.body;

    if (!email || !otp || !firstName || !lastName || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const storedOtpData = otpStore.get(email);
    if (!storedOtpData) {
      return res.status(400).json({ error: "OTP not found or expired" });
    }

    const { otp: storedOtp, otpExpiresAt } = storedOtpData;
    if (parseInt(otp) !== storedOtp || Date.now() > otpExpiresAt) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Create the new user (password will be hashed automatically)
    const newUser = await User.create({
      id: uuidv4(),
      firstName,
      lastName,
      email,
      password,
    });
    // Remove OTP data from the store
    otpStore.delete(email);

    // Generate token (assuming generateToken function exists)
    const token = generateToken(newUser);

    // Return the success response
    res.status(201).json({
      message: "Verification successful",
      token,
    });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ error: "Verification failed" });
  }
};

/**
 * Login a user with email and password.
 */
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

/**
 * Send OTP for password reset.
 */
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const otp = generateOTP();
    const otpExpiresAt = Date.now() + 5 * 60 * 1000;

    otpStore.set(email, { otp, otpExpiresAt });

    await sendEmail(
      email,
      "Password Reset OTP",
      `
  Dear User,

  We received a request to reset your password for your Book Inventory account.

  Your One-Time Password (OTP) for resetting your password is: **${otp}**

  This OTP is valid for the next 5 minutes. Please use it to reset your password promptly.

  If you did not request a password reset, please ignore this email or contact our support team immediately.

  Best regards,  
  The Book Inventory Team
  `
    );

    res.status(200).json({ message: "OTP sent to email" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ error: "Failed to send OTP" });
  }
};

/**
 * Verify OTP for password reset.
 */
const verifyResetOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const storedOtpData = otpStore.get(email);

    if (!storedOtpData) {
      return res.status(400).json({ error: "OTP not found or expired" });
    }

    const { otp: storedOtp, otpExpiresAt } = storedOtpData;

    if (parseInt(otp) !== storedOtp || Date.now() > otpExpiresAt) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    otpStore.delete(email);
    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ error: "Verification failed" });
  }
};

/**
 * Reset the user's password.
 */
const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    user.password = newPassword; // Assuming password hashing middleware in User model
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ error: "Password reset failed" });
  }
};

export {
  register,
  login,
  verifyOtp,
  resetPassword,
  forgotPassword,
  verifyResetOtp,
};
