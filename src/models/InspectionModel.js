const mongoose = require("mongoose");

const inspectionSchema = new mongoose.Schema(
  {
 car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
      required: true,
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
  type: String,
  default: "pending",
  enum: ["pending", "approved", "rejected"]
},
    condition: String,
    mileageVerified: Boolean,
    accidentHistory: String,
    engineCondition: String,
    remarks: String,
  },
  

  { timestamps: true }
);

module.exports = mongoose.model("Inspection", inspectionSchema);