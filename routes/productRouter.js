const express = require("express");
const router = express.Router();

//Product API
const { getAllProducts } = require("../api/productApi");

//Get all products
router.get("/products", getAllProducts);

module.exports = router;
