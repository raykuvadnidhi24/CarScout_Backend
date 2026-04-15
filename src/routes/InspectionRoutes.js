const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middleware/authMiddleware");
const {
  createInspection,
  getAllInspections,
  updateInspectionStatus
} = require("../controller/InspectionController");

router.post("/:carId", authMiddleware(), createInspection);
router.get("/all", getAllInspections);
router.patch("/:id/status", updateInspectionStatus);

module.exports = router;