const express = require("express");
const router = express.Router();

const { createOrder } = require("../api/orderApi");

const { isAuthenticated } = require("../middleware/authMiddleware");

//POST create order
router.post("/order", isAuthenticated, createOrder);

module.exports = router;
