const express = require("express");
const router = express.Router();

//Review Controller
const { createReview, getProductReviews } = require("../api/reviewApi");

const { isAuthenticated } = require("../middleware/authMiddleware");

//POST create review
router.post("/review", isAuthenticated, createReview);
router.get("/review/:id", getProductReviews);

module.exports = router;
