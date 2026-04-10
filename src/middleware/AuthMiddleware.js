// const jwt = require("jsonwebtoken");
// const secret = process.env.JWT_SECRET || "secret";

// exports.authMiddleware = (requiredRole) => {
//   return (req, res, next) => {
//     try {
//       const authHeader = req.headers.authorization;
//       if (!authHeader || !authHeader.startsWith("Bearer ")) {
//         return res.status(401).json({ message: "Authorization token missing or invalid" });
//       }

//       const token = authHeader.split(" ")[1].trim();
//       const decoded = jwt.verify(token, secret);
//       req.user = decoded;

//       if (requiredRole && decoded.role !== requiredRole) {
//         return res.status(403).json({ message: "Access denied: insufficient permissions" });
//       }

//       next();
//     } catch (err) {
//       return res.status(401).json({ message: "Invalid or expired token" });
//     }
//   };
// };


// src/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "secret";

// Middleware to protect routes and optionally check role
exports.authMiddleware = (requiredRole) => {
  return (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer "))
        return res.status(401).json({ message: "Authorization token missing" });

      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, secret);
      req.user = decoded;

      if (requiredRole && decoded.role !== requiredRole)
        return res.status(403).json({ message: "Access denied" });

      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  };
};

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, "your_secret_key");
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};