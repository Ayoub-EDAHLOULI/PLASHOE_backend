const express = require("express");
const router = express.Router();

//Product API
const {
  getAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
} = require("../api/productApi");

//Auth and Authorization middleware
const {
  isAuthenticated,
  isAuthorized,
} = require("../middleware/authMiddleware");

//Get all products
router.get("/products", getAllProducts);
router
  .get("/product/:id", getOneProduct)
  .patch("/product/:id", isAuthenticated, isAuthorized("ADMIN"), updateProduct);
router.post("/product", isAuthenticated, isAuthorized("ADMIN"), createProduct);

module.exports = router;
