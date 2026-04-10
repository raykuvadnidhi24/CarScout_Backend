const TestDrive = require("../models/TestdriveModel");
const Notification = require("../models/NotificationModel"); // import
const jwt = require("jsonwebtoken");

// ------------------ Create Test Drive ------------------
const createTestDrive = async (req, res) => {
    console.log("REQ.USER:", req.user);
  try {
    const { carName, date, time } = req.body;

    if (!req.user) {
  return res.status(401).json({ message: "Unauthorized - No user data" });
}

const testDrive = new TestDrive({
  userId: req.user.id,
  buyerName: req.user.name,
  carName,
  date,
  time,
});

    await testDrive.save();
console.log("USER DATA:", req.user);
    res.json({ message: "Test Drive Booked" });
  } catch (err) {
    console.error("TEST DRIVE ERROR:", err); // ✅ VERY IMPORTANT
    res.status(500).json({ message: "Server Error" });
  }
};

// ------------------ Get User Test Drives ------------------
const getUserTestDrives = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");

    const testDrives = await TestDrive.find({ userId: decoded.id });

    res.status(200).json(testDrives);
  } catch (err) {
    console.error("Fetch Test Drives Error:", err);
    res.status(500).json({
      message: "Error fetching test drives",
      error: err.message,
    });
  }
};

// ------------------ Get All Test Drives (Seller/Admin) ------------------
const getAllTestDrives = async (req, res) => {
  try {
    const testDrives = await TestDrive.find().populate("userId", "email");

    res.status(200).json(testDrives);
  } catch (err) {
    console.error("Fetch All Test Drives Error:", err);
    res.status(500).json({
      message: "Error fetching all test drives",
      error: err.message,
    });
  }
};

// ------------------ Update Test Drive Status ------------------

const updateTestDriveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

   const updated = await TestDrive.findByIdAndUpdate(
  id,
  { status },
  { returnDocument: 'after' } // 👈 modern replacement
);

    console.log("UPDATED DATA:", updated); // 👈 ADD THIS
    console.log("STATUS:", status);        // 👈 ADD THIS

    if (status?.toLowerCase() === "approved") {
      if (!updated.userId) {
        console.log("❌ userId missing, notification not created");
      } else {
        await Notification.create({
          userId: updated.userId,
          message: `Your test drive for ${updated.carName} is approved!`,
        });

        console.log("✅ Notification created");
      }
    }

    res.status(200).json({
      message: "Test Drive Updated",
      data: updated,
    });
  } catch (err) {
    console.error("Update Test Drive Error:", err);
    res.status(500).json({
      message: "Error updating test drive",
      error: err.message,
    });
  }
};



const deleteTestDrive = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await TestDrive.findByIdAndDelete(id);

    res.status(200).json({
      message: "Test Drive Deleted",
      data: deleted,
    });
  } catch (err) {
    console.error("Delete Test Drive Error:", err);
    res.status(500).json({
      message: "Error deleting test drive",
      error: err.message,
    });
  }
};


module.exports = {
  createTestDrive,
  getUserTestDrives,
  getAllTestDrives,
  updateTestDriveStatus,
  deleteTestDrive,
};

