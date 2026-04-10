// app.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

// Database connection
const DBConnection = require("./src/utils/DBConnection");

// Load environment variables
dotenv.config();

const app = express();





// ----------------- Middlewares -----------------
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Parse JSON request body
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded body

// Serve static files (e.g., uploaded car images)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ----------------- Database -----------------
DBConnection();

// ----------------- Routes -----------------
const userRoutes = require("./src/routes/UserRoutes");
const testdriveRoutes = require("./src/routes/TestdriveRoutes");
const manageInquiriesRoutes = require("./src/routes/ManageInquiriesRoutes");
const carRoutes = require("./src/routes/CarRoutes");
const notificationRoutes = require("./src/routes/NotificationRoutes");
const adminRoutes = require("./src/routes/AdminRoutes");
const contactRoutes = require("./src/routes/ContactRoutes");


app.use("/user", userRoutes);
app.use("/testdrive", testdriveRoutes);
app.use("/inquiries", manageInquiriesRoutes);
app.use("/api", carRoutes);
app.use("/notifications", notificationRoutes);
app.use("/api", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api", contactRoutes);




// ----------------- Health Check -----------------
app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running 🚀" });
});

// ----------------- 404 Handler -----------------
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// ----------------- Global Error Handler -----------------
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// ----------------- Start Server -----------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


