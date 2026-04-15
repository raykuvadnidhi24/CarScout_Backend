const Inspection = require("../models/InspectionModel");

// CREATE INSPECTION
exports.createInspection = async (req, res) => {
  try {
    console.log("🔥 CONTROLLER STARTED");
    console.log("CarId:", req.params.carId);
    console.log("Body:", req.body);

    const inspection = await Inspection.create({
      car: req.params.carId,
      sellerId: req.user.id, // ✅ IMPORTANT FIX
      ...req.body,
    });

    return res.status(201).json({
      message: "Inspection submitted successfully",
      inspection,
    });
  } catch (err) {
    console.log("❌ ERROR:", err);
    return res.status(500).json({ message: err.message });
  }
};

// GET ALL INSPECTIONS (ADMIN)
exports.getAllInspections = async (req, res) => {
  try {
    const inspections = await Inspection.find()
      .populate("car") // gives year, mileage, name
      .populate("sellerId", "firstName lastName email");
      // 👇 ADD THIS LINE (DEBUG)
    console.log(JSON.stringify(inspections, null, 2));

    res.json(inspections);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE STATUS (ADMIN APPROVE/REJECT)
exports.updateInspectionStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const inspection = await Inspection.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("car");

    // ✅ AUTO UPDATE CAR
    if (status === "approved") {
      await require("../models/CarModel").findByIdAndUpdate(
        inspection.car._id,
        { verified: true }   // add this field in Car model
      );
    }

    res.json(inspection);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};