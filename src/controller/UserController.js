const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const mailSender = require("../utils/Mailutil");
const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET || "secret";

// ------------------ Register ------------------
const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone, city, state, role } = req.body;

    if (!firstName || !lastName || !email || !password || !phone || !city || !state || !role)
      return res.status(400).json({ message: "All fields are required" });

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const savedUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
      city,
      state,
      role,
    });

    // Optional: send welcome email
    await mailSender(savedUser.email, "Welcome to Car Scout 🎉", savedUser.firstName);

    const token = jwt.sign(
      {
        id: savedUser._id,
        email: savedUser.email,
        phone: savedUser.phone,
        city: savedUser.city,
        state: savedUser.state,
        role: savedUser.role,
      },
      secret,
      { expiresIn: "7d" }
    );

    savedUser.password = undefined; // hide password

    res.status(201).json({ message: "User created", token, user: savedUser });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: "Error creating user", error: err.message });
  }
};

// ------------------ Login ------------------
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      secret,
      { expiresIn: "1d" }
    );

    user.password = undefined;
    res.status(200).json({ token, user });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: err.message });
  }
};

// ------------------ Get all buyers ------------------
const getBuyers = async (req, res) => {
  try {
    const buyers = await User.find({ role: "buyer" }).select("-password");
    res.status(200).json(buyers);
  } catch (err) {
    console.error("Error fetching buyers:", err);
    res.status(500).json({ message: "Failed to fetch buyers" });
  }
};

// ------------------ Get all sellers ------------------
const getSeller = async (req, res) => {
  try {
    const sellers = await User.find({ role: "seller" }).select("-password");
    res.status(200).json(sellers);
  } catch (err) {
    console.error("Error fetching sellers:", err);
    res.status(500).json({ message: "Failed to fetch sellers" });
  }
};

// ------------------ Delete buyer ------------------
const deleteBuyer = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: "Buyer not found" });

    res.status(200).json({ message: "Buyer deleted successfully" });
  } catch (err) {
    console.error("Delete Error:", err);
    res.status(500).json({ message: err.message });
  }
};



module.exports = { registerUser, loginUser, getBuyers, getSeller, deleteBuyer };

