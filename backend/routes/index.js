// routes/index.js
const express = require("express");
const router = express.Router();
const { getProducts } = require("../controllers");

router.get("/", (req, res) => {
  res.send("Welcome to Xisekelo Safety Backend!");
});

router.get("/products", getProducts);

module.exports = router;
