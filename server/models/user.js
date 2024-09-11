// const mongoose = require("mongoose");
// // const bcrypt = require("bcryptjs");

// const userSchema = new mongoose.Schema({
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   otp: { type: String, required: false },
//   resetToken: { type: String, required: false },
//   resetTokenExpiry: { type: Date, required: false },
// });

// // Hash password before saving user
// // userSchema.pre("save", async function (next) {
// //   if (!this.isModified("password")) return next();
// //   const salt = await bcrypt.genSalt(10);
// //   this.password = await bcrypt.hash(this.password, salt);
// //   next();
// // });


// module.exports = mongoose.model("User", userSchema);

