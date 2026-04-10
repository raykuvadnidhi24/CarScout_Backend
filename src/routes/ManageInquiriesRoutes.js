const express = require("express");
const router = express.Router();

const {
  createInquiry,
  getInquiries,
  updateInquiryStatus,
  deleteInquiry,
  replyToInquiry, // ✅ IMPORT THIS
} = require("../controller/ManageInquiriesController");

const { authMiddleware } = require("../middleware/authMiddleware");


// ✅ CREATE INQUIRY (Buyer)
router.post("/create", authMiddleware(), createInquiry);

// ✅ GET ALL INQUIRIES (Seller)
router.get("/all", authMiddleware(), getInquiries);

// ✅ SELLER REPLY + NOTIFICATION 🔥
router.put("/reply/:id", authMiddleware(), replyToInquiry);

// ✅ UPDATE STATUS
router.put("/:id", authMiddleware(), updateInquiryStatus);

// ✅ DELETE
router.delete("/:id", authMiddleware(), deleteInquiry);


module.exports = router;