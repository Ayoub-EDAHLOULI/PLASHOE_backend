const express = require("express");
const router = express.Router();

const { createOrder, getUserOrders } = require("../api/orderApi");

const { isAuthenticated } = require("../middleware/authMiddleware");

//POST create order
router
  .post("/order", isAuthenticated, createOrder)
  .get("/order", isAuthenticated, getUserOrders);

module.exports = router;
