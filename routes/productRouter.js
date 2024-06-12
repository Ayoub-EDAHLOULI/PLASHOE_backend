const express = require("express");
const router = express.Router();

//Product API
const {
  getAllProducts,
  getOneProduct,
  createProduct,
} = require("../api/productApi");

//Auth and Authorization middleware
const {
  isAuthenticated,
  isAuthorized,
} = require("../middleware/authMiddleware");

//Get all products
router.get("/products", getAllProducts);
router.get("/product/:id", getOneProduct);
router.post("/product", isAuthenticated, isAuthorized("ADMIN"), createProduct);

module.exports = router;
