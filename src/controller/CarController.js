const Car = require("../models/CarModel");
const fs = require("fs");
const path = require("path");

const getImageURL = (req, imagePath) => {
  if (!imagePath) return null;
  return `${req.protocol}://${req.get("host")}/uploads/${imagePath}`;
};
//create car
exports.createCar = async (req, res) => {
  try {
    const carData = {
      ...req.body,
      seller: req.user?.id, // safe
    };

    if (req.file) {
      carData.image = req.file.filename; // ✅ IMPORTANT FIX
    }

    const car = new Car(carData);
    await car.save();

    res.status(201).json({ message: "Car added successfully" });
  }catch (error) {
  console.log(error); // 👈 ADD THIS
  res.status(500).json({ message: error.message });
}
};

// GET ALL
exports.getAllCars = async (req, res) => {
  try {
    const cars = await Car.find(); // ✅ show ALL cars

    const response = cars.map((c) => ({
      ...c.toObject(),
      imageURL: getImageURL(req, c.image),
    }));

    res.status(200).json(response);
  } catch (error) {
    console.error("Fetch Cars Error:", error);
    res.status(500).json({ message: "Failed to fetch cars", error: error.message });
  }
};

// GET BY ID
exports.getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    const response = { ...car.toObject(), imageURL: getImageURL(req, car.image) };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch car", error: error.message });
  }
};

  
// UPDATE
exports.updateCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });

    if (req.file) {
      if (car.image && fs.existsSync(car.image)) fs.unlinkSync(car.image);
      req.body.image = req.file.path;
    }

    const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
    const response = { ...updatedCar.toObject(), imageURL: getImageURL(req, updatedCar.image) };
    res.status(200).json({ message: "Car updated", ...response });
  } catch (error) {
    console.error("Update Car Error:", error);
    res.status(500).json({ message: "Failed to update car", error: error.message });
  }
};

// DELETE
exports.deleteCar = async (req, res) => {
  try {
    const deletedCar = await Car.findByIdAndDelete(req.params.id);
    if (!deletedCar) return res.status(404).json({ message: "Car not found" });

    if (deletedCar.image && fs.existsSync(deletedCar.image)) fs.unlinkSync(deletedCar.image);

    res.status(200).json({ message: "Car deleted successfully" });
  } catch (error) {
    console.error("Delete Car Error:", error);
    res.status(500).json({ message: "Failed to delete car", error: error.message });
  }
};

