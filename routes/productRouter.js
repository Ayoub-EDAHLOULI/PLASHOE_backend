const express = require("express");
const router = express.Router();

//Product API
const {
  getAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
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
  .patch("/product/:id", isAuthenticated, isAuthorized("ADMIN"), updateProduct)
  .delete(
    "/product/:id",
    isAuthenticated,
    isAuthorized("ADMIN"),
    deleteProduct
  );
router.post("/product", isAuthenticated, isAuthorized("ADMIN"), createProduct);

module.exports = router;
