// server.js
const express = require("express");
const cors = require("cors");          // ✅ import cors
const routes = require("./routes");
require("dotenv").config();

const app = express();

// Enable CORS for all origins (or restrict to frontend)
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));                       // ✅ enable CORS

app.use(express.json());

app.use("/api", routes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Backend is running" });
});

// 404 handler for non-API routes
app.use((req, res) => {
  if (!req.path.startsWith("/api")) {
    res.status(404).json({
      error: "Not Found",
      message: `Route ${req.path} not found. API routes should start with /api`,
      availableRoutes: [
        "GET /api/products",
        "POST /api/auth/register",
        "POST /api/auth/login",
        "GET /api/auth/me",
      ],
    });
  } else {
    res.status(404).json({
      error: "Not Found",
      message: `API route ${req.path} not found`,
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Xisekelo Safety backend running on port", PORT);
});
