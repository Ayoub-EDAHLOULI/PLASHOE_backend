const express = require("express");
const router = express.Router();

//Review Controller
const {
  createReview,
  getProductReviews,
  updateReview,
  deleteReview,
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
  )
  .delete(
    "/review/:id",
    isAuthenticated,
    isAuthorized("ADMIN", "CUSTOMER"),
    deleteReview
  );

module.exports = router;
