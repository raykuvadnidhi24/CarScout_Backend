const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    model: { type: String },
    year: { type: Number },
    mileage:{type: Number},
    price: { type: Number, required: true },
    description: { type: String },
    image: { type: String },
    color: {type: String},
    fuel: {type:String},
    brand: {type:String},

    seller : { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      enum: ["available", "sold", "pending"],
      default: "available",
    },
    verified: {
  type: Boolean,
  default: false
},
    approved: {
  type: Boolean,
  default: false
},
  },
  { timestamps: true }
);


module.exports = mongoose.model("Car", carSchema);