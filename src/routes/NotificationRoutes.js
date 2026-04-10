const express = require("express");
const router = express.Router();
const { getUserNotifications } = require("../controller/NotificationController");
const { authMiddleware } = require("../middleware/authMiddleware");

// GET /notifications → get notifications for logged-in user
router.get("/", authMiddleware(), getUserNotifications);

module.exports = router;