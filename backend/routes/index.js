const express = require('express');
const router = express.Router();
const { testController } = require('../controllers/index');

// Test route
router.get('/', testController);

module.exports = router;
