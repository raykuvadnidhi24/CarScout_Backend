// sellerRoutes.js
const express = require("express");
const router = express.Router();
const Car = require("../models/Car");
const { addCar } = require("../controller/SellerController");
const upload = require("../middleware/multer"); // for images

// DELETE car by id
router.delete("/car/:id", async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.json({ message: "Car deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

//router.post("/addcar", upload.single("image"), addCar);



module.exports = router;