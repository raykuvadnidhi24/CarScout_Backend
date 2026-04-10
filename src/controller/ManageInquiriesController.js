const Inquiry = require("../models/ManageInquiriesModel");
const User = require("../models/UserModel"); // ✅ ADD THIS
const Notification = require("../models/NotificationModel");

// ✅ CREATE INQUIRY (Buyer)
const createInquiry = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { car, message } = req.body;

    const newInquiry = new Inquiry({
      buyerName: user.email, // ✅ from DB
      userId,
      car,
      message,
      userId: req.user.id, 
    });

    await newInquiry.save();

    res.status(201).json({
      message: "Inquiry submitted successfully!",
      inquiry: newInquiry,
    });
  } catch (error) {
  console.error("❌ FULL ERROR:", error); // ✅ ADD THIS
  res.status(500).json({ message: error.message }); // ✅ SHOW REAL ERROR
}
};


// ✅ GET ALL INQUIRIES (Seller)
const getInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.status(200).json({ inquiries });
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    res.status(500).json({ message: "Server error" });
  }
};



// ✅ SELLER REPLY + NOTIFICATION 🔥
const replyToInquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const { reply } = req.body;

    if (!reply) {
      return res.status(400).json({ message: "Reply is required" });
    }

    const inquiry = await Inquiry.findById(id);

    if (!inquiry) {
      return res.status(404).json({ message: "Inquiry not found" });
    }

    // ✅ Save reply
    inquiry.reply = reply;
    inquiry.status = "Confirmed";
    await inquiry.save();

    // ✅ Better notification 🔔
  await Notification.create({
  userId: inquiry.userId,
  message: `Seller replied: "${reply}" for ${inquiry.car}`,
  type: "inquiry",     // ✅ ADD THIS
  read: false,         // ✅ ADD THIS
});

    res.status(200).json({
      message: "Reply sent successfully",
      inquiry,
    });
  } catch (error) {
    console.error("Reply error:", error);
    res.status(500).json({ message: error.message });
  }
};



// ✅ UPDATE STATUS (optional)
const updateInquiryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedInquiry = await Inquiry.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedInquiry) {
      return res.status(404).json({ message: "Inquiry not found" });
    }

    res.status(200).json({
      message: "Status updated successfully",
      inquiry: updatedInquiry,
    });
  } catch (error) {
    console.error("Error updating inquiry:", error);
    res.status(500).json({ message: "Server error" });
  }
};



// ✅ DELETE
const deleteInquiry = async (req, res) => {
  try {
    const { id } = req.params;

    await Inquiry.findByIdAndDelete(id);

    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};





module.exports = {
  createInquiry,
  getInquiries,
  replyToInquiry, // ✅ NEW
  updateInquiryStatus,
  deleteInquiry,
};