const express = require("express");
const router = express.Router();

//Review Controller
const { createReview } = require("../api/reviewApi");

const { isAuthenticated } = require("../middleware/authMiddleware");

//POST create review
router.post("/review", isAuthenticated, createReview);

module.exports = router;
