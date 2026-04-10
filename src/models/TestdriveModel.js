const mongoose = require("mongoose");

const testDriveSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    sellerId: 
    { type: mongoose.Schema.Types.ObjectId,
       ref: "User" },

    buyerName: {   // ✅ ADD THIS
      type: String,
    },

    carName: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },

    status: {   // ✅ OPTIONAL (VERY USEFUL)
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TestDrive", testDriveSchema);