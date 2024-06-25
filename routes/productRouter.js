const express = require("express");
const router = express.Router();

//Product API
const {
  getAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
} = require("../api/productApi");

//Auth and Authorization middleware
const {
  isAuthenticated,
  isAuthorized,
} = require("../middleware/authMiddleware");

//Multer Middleware
const upload = require("../middleware/multerMiddleware");

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

//Upload image
router.post("/upload", isAuthenticated, upload.single("image"), uploadImage);

module.exports = router;
