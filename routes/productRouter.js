const express = require("express");
const router = express.Router();

//Product API
const { getAllProducts, getOneProduct } = require("../api/productApi");

//Get all products
router.get("/products", getAllProducts);
router.get("/product/:id", getOneProduct);

module.exports = router;
