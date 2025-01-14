import axios from "axios";

import { USER_API } from "./index.js";

const signupRoute = async (userData) => {
  return axios.post(`${USER_API}/register`, userData);
};

const login = async (userData) => {
  return axios.post(`${USER_API}/login`, userData);
};

const verifyOtp = async (otpData) => {
  return axios.post(`${USER_API}/verify-otp`, otpData);
};

const forgotPassword = async (email) => {
  return axios.post(`${USER_API}/forgot-password`, email);
};
const verifyRestOtp = async (resetOtpData) => {
  return axios.post(`${USER_API}/verify-reset-otp`, resetOtpData);
};

const resetPassword = async (resetData) => {
  return axios.post(`${USER_API}/reset-password`, resetData);
};

const logout = () => {
  localStorage.removeItem("token");
};

export {
  signupRoute,
  login,
  verifyOtp,
  forgotPassword,
  resetPassword,
  logout,
  verifyRestOtp,
};
