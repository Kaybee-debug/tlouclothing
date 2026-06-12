// routes/index.js
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { getProducts, getProduct } = require("../controllers");
const { sendVerificationCode, register, login, getCurrentUser } = require("../controllers/auth");
const { createOrder, getUserOrders } = require("../controllers/orders");
const { getDashboardStats, getAllOrders, updateOrderStatus, getCategories, syncCatalog, createProduct, updateProduct, deleteProduct } = require("../controllers/admin");
const { upload, uploadImage } = require("../controllers/upload");

const JWT_SECRET = process.env.JWT_SECRET || "xisekelo-safety-secret-key-change-in-production";

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Middleware to verify admin role
const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: "Admin access required" });
    }
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

router.get("/", (req, res) => {
  res.send("Welcome to T.L.O.U. Clothing API");
});

router.get("/products", getProducts);
router.get("/products/:id", getProduct);

// Auth routes
router.post("/auth/send-verification-code", sendVerificationCode);
router.post("/auth/register", register);
router.post("/auth/login", login);
router.get("/auth/me", getCurrentUser);

// Order routes (protected - require authentication)
router.post("/orders", verifyToken, createOrder);
router.get("/orders", verifyToken, getUserOrders);

// Admin routes (protected - require admin role)
router.get("/admin/stats", verifyAdmin, getDashboardStats);
router.get("/admin/orders", verifyAdmin, getAllOrders);
router.put("/admin/orders/:id", verifyAdmin, updateOrderStatus);
router.get("/admin/categories", verifyAdmin, getCategories);
router.post("/admin/sync-catalog", verifyAdmin, syncCatalog);
router.post("/admin/products", verifyAdmin, createProduct);
router.put("/admin/products/:id", verifyAdmin, updateProduct);
router.delete("/admin/products/:id", verifyAdmin, deleteProduct);
router.post("/admin/upload", verifyAdmin, upload.single('image'), uploadImage);

module.exports = router;
