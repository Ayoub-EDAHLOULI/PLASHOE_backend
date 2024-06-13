const express = require("express");
const router = express.Router();

const {
  getAllCategories,
  createCategory,
  getOneCategory,
  updateCategory,
  deleteCategory,
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
router
  .get("/category/:id", getOneCategory)
  .put("/category/:id", isAuthenticated, isAuthorized("ADMIN"), updateCategory)
  .delete(
    "/category/:id",
    isAuthenticated,
    isAuthorized("ADMIN"),
    deleteCategory
  );

module.exports = router;
