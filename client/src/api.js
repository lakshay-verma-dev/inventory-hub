import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; // Change to your backend URL

// export const signupRoute = async (userData) => {
//   return axios.post(`${API_BASE_URL}/auth/signup`, userData);
// };

// export const login = async (userData) => {
//   return axios.post(`${API_BASE_URL}/auth/login`, userData);
// };

// export const verifyOtp = async (otpData) => {
//   return axios.post(`${API_BASE_URL}/auth/verify-otp`, otpData);
// };

// export const forgotPassword = async (email) => {
//   return axios.post(`${API_BASE_URL}/auth/forgot-password`, email);
// };

// export const resetPassword = async (resetData) => {
//   return axios.post(`${API_BASE_URL}/auth/reset-password`, resetData);
// };

export const uploadBook = async (newbookdata) => {
  return axios.post(`${API_BASE_URL}/books/upload-book`, newbookdata);
};
export const getBook = async () => {
  return axios.get(`${API_BASE_URL}/books/all-books`);
};
export const deleteBook = async (id) => {
  return axios.delete(`${API_BASE_URL}/books/delete-book/${id}`);
};
export const getsingleBook = async (id) => {
  return axios.get(`${API_BASE_URL}/books/book/${id}`);
};
export const UpdateBook = async (id,updateData) => {
  return axios.patch(`${API_BASE_URL}/books/book/${id}`, updateData);
};
export const paymentSession = async (productdata) => {
  return axios.post(`${API_BASE_URL}/books/Payment-checkout`,productdata);
};

export const logout = () => {
  // Clear local storage or cookies
  localStorage.removeItem("token");
};
