const express = require("express");
const router = express.Router();

//Payment Controller
const { createPayment } = require("../api/paymentApi");

const { isAuthenticated } = require("../middleware/authMiddleware");

router.post("/payment", isAuthenticated, createPayment);

module.exports = router;
