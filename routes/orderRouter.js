const express = require("express");
const router = express.Router();

const { createOrder, getUserOrders, getOrderById } = require("../api/orderApi");

const { isAuthenticated } = require("../middleware/authMiddleware");

//POST create order and GET user orders
router
  .post("/order", isAuthenticated, createOrder)
  .get("/order", isAuthenticated, getUserOrders);

//GET order by id
router.get("/order/:id", getOrderById);

module.exports = router;
