// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema(
//   {
//     firstName: {
//       type: String,
//       required: [true, "First name is required"],
//     },
//       email: {
//       type: String,
//       required: [true, "Email is required"],
//       unique: true,
//       lowercase: true,
//     },
//     password: {
//       type: String,
//       required: [true, "Password is required"],
//     },
//     role: {
//       type: String,
//       enum: ["buyer", "seller","admin"],
//       required: [true, "Role is required"],
//     }
//   },
//     { timestamps: true }
// );

// module.exports = mongoose.model("User", userSchema);

// src/models/UserModel.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    phone:{
      type: String,
      required: [true, "Phone number is required"],
    },
    city:{
      type: String,
      required: [true, "City is required"],
    },
    state:{
      type: String,
      required: [true, "State is required"],
    },
    role: {
      type: String,
      enum: ["buyer", "seller", "admin"],
      required: [true, "Role is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);