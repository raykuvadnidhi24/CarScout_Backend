const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema(
  {
     userId: {   // ✅ ADD THIS (VERY IMPORTANT)
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    buyerName: {
      type: String,
    
    },
    car: {
      type: String,
      required: true,
},
    message: {
      type: String,
      required: true,
    },
     reply: { type: String }, // ✅ SELLER MESSAGE
    
    status:{
        type:String,
        enum:["Pending","Confirmed","Completed"],
        default:"Pending"
    },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Inquiry", inquirySchema);