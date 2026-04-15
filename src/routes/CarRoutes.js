const express = require("express");
const router = express.Router();
const carController = require("../controller/CarController");
const { authMiddleware } = require("../middleware/authMiddleware");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
const Car = require("../models/CarModel"); 

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });


// Public routes (frontend can access)
router.get("/cars", carController.getAllCars);        // List all cars
router.get("/cars/:id", carController.getCarById);    // Get car by ID

// Protected routes (for sellers)
router.post("/cars/addcar", authMiddleware("seller"), upload.single("image"), carController.createCar);
router.put("/cars/:id", authMiddleware("seller"), upload.single("image"), carController.updateCar);
router.delete("/cars/:id", authMiddleware("seller"), carController.deleteCar);



router.get("/pending", async (req, res) => {
  try {
    const cars = await Car.find({ approved: false });
    res.json(cars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ APPROVE CAR
router.patch("/:id/approval", async (req, res) => {
  try {
    const { approved } = req.body;

    const car = await Car.findByIdAndUpdate(
      req.params.id,
      { approved },
      { new: true }
    );

    res.json(car);
  } catch (error) {
    res.status(500).json({ message: "Error updating car" });
  }
});


module.exports = router;