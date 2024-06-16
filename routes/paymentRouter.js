const express = require("express");
const router = express.Router();

//Payment Controller
const {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
} = require("../api/paymentApi");

const {
  isAuthenticated,
  isAuthorized,
} = require("../middleware/authMiddleware");

router
  .post("/payment", isAuthenticated, createPayment)
  .get("/payments", isAuthenticated, isAuthorized("ADMIN"), getAllPayments);

router
  .get("/payment/:id", isAuthenticated, getPaymentById)
  .put(
    "/payment/:id",
    isAuthenticated,
    isAuthorized("ADMIN", "CUSTOMER"),
    updatePayment
  );

module.exports = router;
