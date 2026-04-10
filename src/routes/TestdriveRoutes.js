const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();
const {
  createTestDrive,
  getUserTestDrives,
  getAllTestDrives,
  updateTestDriveStatus,
  deleteTestDrive,
} = require("../controller/TestdriveController");

router.post("/create", authMiddleware(), createTestDrive);
router.get("/my", authMiddleware(), getUserTestDrives);

// optional role protection
router.get("/all", authMiddleware("seller"), getAllTestDrives);
router.put("/:id", authMiddleware("seller"), updateTestDriveStatus);
router.delete("/:id", authMiddleware("seller"), deleteTestDrive);
module.exports = router;

