const express = require("express");
const router = express.Router();

const {
  createOrder,
  getUserOrders,
  getOrderById,
  getAllOrders,
} = require("../api/orderApi");

const {
  isAuthenticated,
  isAuthorized,
} = require("../middleware/authMiddleware");

//POST create order and GET user orders
router
  .post("/order", isAuthenticated, createOrder)
  .get("/order", isAuthenticated, getUserOrders)
  .get("/orders", isAuthenticated, isAuthorized("ADMIN"), getAllOrders);

//GET order by id
router.get("/order/:id", getOrderById);

module.exports = router;
