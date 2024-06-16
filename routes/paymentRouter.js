const express = require("express");
const router = express.Router();

//Payment Controller
const { createPayment, getAllPayments } = require("../api/paymentApi");

const {
  isAuthenticated,
  isAuthorized,
} = require("../middleware/authMiddleware");

router
  .post("/payment", isAuthenticated, createPayment)
  .get("/payments", isAuthenticated, isAuthorized("ADMIN"), getAllPayments);

module.exports = router;
