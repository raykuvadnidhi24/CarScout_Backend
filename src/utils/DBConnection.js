const mongoose = require("mongoose");
require("dotenv").config();

const DBConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL); // No extra options needed
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
};

module.exports = DBConnection;