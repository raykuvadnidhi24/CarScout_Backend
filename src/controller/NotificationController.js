const mongoose = require("mongoose");
const Notification = require("../models/NotificationModel");

const getUserNotifications = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    console.log("REQ.USER IN CONTROLLER:", req.user);

    // Use string ID directly
    const notifications = await Notification.find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    console.log("NOTIFICATIONS FOUND:", notifications);

    res.status(200).json({ notifications });
  } catch (err) {
    console.error("Fetch Notifications Error:", err);
    res.status(500).json({
      message: "Error fetching notifications",
      error: err.message,
    });
  }
};

module.exports = { getUserNotifications };