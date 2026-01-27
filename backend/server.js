// server.js
const express = require("express");
const cors = require("cors");          // ✅ import cors
const path = require("path");
const routes = require("./routes");
require("dotenv").config();

const app = express();

// Enable CORS for all origins (or restrict to frontend)
app.use(cors({
  origin: [
    'http://localhost:3000', 
    'http://localhost:3001',
    'http://localhost:3002',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3001',
    'http://127.0.0.1:3002',
    'http://10.0.0.86:3014',
    'http://10.0.0.86:3013',
    'http://10.0.0.109:3000',
    'http://10.0.0.109:3001',
    'http://10.0.0.109:3002'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));                       // ✅ enable CORS

app.use(express.json());

// Serve static files from public directory
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Xisekelo Safety API",
    version: "1.0.0",
    status: "running",
    endpoints: {
      health: "GET /health",
      api: {
        products: "GET /api/products",
        auth: {
          register: "POST /api/auth/register",
          login: "POST /api/auth/login",
          me: "GET /api/auth/me"
        }
      }
    }
  });
});

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

const PORT = process.env.PORT || 3003;
app.listen(PORT, '0.0.0.0', () => {
  console.log("Xisekelo Safety backend running on port", PORT);
  console.log("DB connection:", {
    host: process.env.DB_HOST || '10.0.0.65',
    database: process.env.DB_NAME || 'xisekelo',
    user: process.env.DB_USER || 'xisekelo'
  });
});
