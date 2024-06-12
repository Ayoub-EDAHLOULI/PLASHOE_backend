const express = require("express");
const router = express.Router();

const { getAllCategories, createCategory } = require("../api/categoryApi");

//Auth and Authorization Middleware
const {
  isAuthenticated,
  isAuthorized,
} = require("../middleware/authMiddleware");

router.get("/categories", getAllCategories);
router.post(
  "/category",
  isAuthenticated,
  isAuthorized("ADMIN"),
  createCategory
);

module.exports = router;
