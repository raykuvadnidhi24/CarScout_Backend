const router = require("express").Router();
const userController = require("../controller/UserController");
const { authMiddleware } = require("../middleware/authMiddleware");
const { deleteBuyer } = require("../controller/UserController");

// Public routes
router.post("/signup", userController.registerUser);
router.post("/login", userController.loginUser);

// Admin route: get all buyers
router.get("/buyers", authMiddleware("admin"), userController.getBuyers);
// Admin route: get all sellers
router.get("/sellers", authMiddleware("admin"), userController.getSeller);
router.delete("/buyers/:id", authMiddleware, deleteBuyer);
router.delete("/buyer/:id", deleteBuyer);
router.delete("/deleteBuyer/:id", deleteBuyer);



router.put("/buyer/:id", async (req, res) => {
  console.log("UPDATE API CALLED"); // ✅ debug

  try {
    const updatedBuyer = await Buyer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedBuyer) {
      return res.status(404).json({ message: "Buyer not found" });
    }

    res.json(updatedBuyer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Update failed" });
  }
});
router.put("/buyer/:id", async (req, res) => {
  try {
    console.log("BODY:", req.body); // 🔍 debug

    const allowedFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "city",
      "state",
    ];

    const updateData = {};

    // ✅ only allow valid fields
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    const updatedBuyer = await Buyer.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedBuyer) {
      return res.status(404).json({ message: "Buyer not found" });
    }

    res.json(updatedBuyer);
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});




module.exports = router;


