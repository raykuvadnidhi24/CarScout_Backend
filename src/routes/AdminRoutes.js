const express = require("express");
const router = express.Router();
const { getAnalytics } = require("../controller/AdminController");
const { getDashboard } = require("../controller/AdminController");

router.get("/analytics", getAnalytics);
router.get("/dashboard", getDashboard);

module.exports = router;