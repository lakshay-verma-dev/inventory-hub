import { Router } from "express";
const authRoutes = Router();
import {
  forgotPassword,
  login,
  register,
  resetPassword,
  verifyOtp,
  verifyResetOtp,
} from "../controllers/auth.controllers.js";

authRoutes.post("/register", register);
authRoutes.post("/login", login);
// authRoutes.post("/logout", logout);
authRoutes.post("/verify-reset-otp", verifyResetOtp);

authRoutes.post("/forgot-password", forgotPassword);
authRoutes.post("/reset-password", resetPassword);
authRoutes.post("/verify-otp", verifyOtp);

export default authRoutes;
