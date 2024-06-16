const express = require("express");
const router = express.Router();

//Review Controller
const {
  createReview,
  getProductReviews,
  updateReview,
} = require("../api/reviewApi");

const {
  isAuthenticated,
  isAuthorized,
} = require("../middleware/authMiddleware");

router.post("/review", isAuthenticated, createReview);
router
  .get("/review/:id", getProductReviews)
  .patch(
    "/review/:id",
    isAuthenticated,
    isAuthorized("ADMIN", "CUSTOMER"),
    updateReview
  );

module.exports = router;
