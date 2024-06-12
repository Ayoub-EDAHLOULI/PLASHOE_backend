const express = require("express");
const router = express.Router();

//Product API
const {
  getAllProducts,
  getOneProduct,
  createProduct,
} = require("../api/productApi");

//Get all products
router.get("/products", getAllProducts);
router.get("/product/:id", getOneProduct);
router.post("/product", createProduct);

module.exports = router;
