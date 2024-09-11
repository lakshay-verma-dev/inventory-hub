// const express = require("express");
// const {
//   signup,
//   login,
//   logout,
//   forgotPassword,
//   resetPassword,
//   verifyOtp,
// } = require("../controllers/authControllers");
// const router = express.Router();

// const connectDB = require("../config/db");
// async function performDatabaseOperations() {
//   try {
//     const { userCollections } = await connectDB();
//     router.post("/signup", async (req, res) => {
//       signup(req, res, userCollections);
//     });
//     router.post("/login", async (req, res) => {
//       login(req, res, userCollections);
//     });
//     router.post("/logout", async (req, res) => {
//       logout(req, res, userCollections);
//     });
//     router.post("/forgot-password", async (req, res) => {
//       forgotPassword(req, res, userCollections);
//     });
//     router.post("/reset-password", async (req, res) => {
//       resetPassword(req, res, userCollections);
//     });
//     router.post("/verify-otp", verifyOtp);
//   } catch (error) {
//     console.error("Error performing database operations:", error);
//   }
// }

// performDatabaseOperations();

// // Routes


// module.exports = router;
