const express = require("express");
const router = express.Router();

const {
  getAllCategories,
  createCategory,
  getOneCategory,
} = require("../api/categoryApi");

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
router.get("/category/:id", getOneCategory);

module.exports = router;
