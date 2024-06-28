const { ErrorHandler, handleError } = require("../utils/errorHandler");
const { handleSuccess } = require("../utils/successHandler");

//Product Services
const {
  getAllProductsService,
  getOneProductService,
  createProductService,
  checkProduct,
  updateProductService,
  deleteProductService,
} = require("../services/productServices");

//Get all products
const getAllProducts = async (req, res) => {
  try {
    //Get all products
    const products = await getAllProductsService();
    //Return the products
    handleSuccess(res, products, 200, "Products retrieved successfully");
  } catch (error) {
    handleError(res, error);
  }
};

//Get a single product
const getOneProduct = async (req, res) => {
  try {
    //Get the product ID from the request params
    const { id } = req.params;

    //Get the product
    const product = await getOneProductService(id);

    //Return the product
    handleSuccess(res, product, 200, "Product retrieved successfully");
  } catch (error) {
    handleError(res, error);
  }
};

//Upload image
const uploadImage = async (req, res) => {
  try {
    //Get the image from the request
    const file = req.file;

    //Check if the image is provided
    if (!file) {
      throw new ErrorHandler(400, "Please provide an image");
    }

    const imageUrl = `http://127.0.0.1:3000/images/${req.file.filename}`;

    //Return the image
    handleSuccess(res, imageUrl, 200, "Image uploaded successfully");
  } catch (error) {
    handleError(res, error);
  }
};

//Create a new product
const createProduct = async (req, res) => {
  try {
    //Get the product data from the request body
    const { name, description, price, stock, image, categoryId } = req.body;

    //Get the user id from the request
    const userId = req.user.id;

    //Check if name, price, description and stock are provided
    if (!name || !price || !description || !stock) {
      throw new ErrorHandler(
        400,
        "Please provide name, price, description and stock"
      );
    }

    //Check if the price and stock are numbers
    if (isNaN(price) || isNaN(stock)) {
      throw new ErrorHandler(400, "Price and stock must be numbers");
    }

    //Check if the price and stock are positive numbers
    if (price < 0 || stock < 0) {
      throw new ErrorHandler(400, "Price and stock must be positive numbers");
    }

    //Check if the price and stock are greater than 0
    if (price <= 0 || stock <= 0) {
      throw new ErrorHandler(400, "Price and stock must be greater than 0");
    }

    //Check if the name is a string
    if (typeof name !== "string") {
      throw new ErrorHandler(400, "Name must be a string");
    }

    //Check if the product already exists
    const productExists = await checkProduct(name);
    if (productExists) {
      throw new ErrorHandler(400, "Product already exists");
    }

    //Create the product
    const newProduct = await createProductService(
      name,
      description,
      Number(price),
      Number(stock),
      image,
      userId,
      Number(categoryId)
    );

    //Return the product
    handleSuccess(res, newProduct, 201, "Product created successfully");
  } catch (error) {
    handleError(res, error);
  }
};

//Update a product
const updateProduct = async (req, res) => {
  try {
    //Get the product ID from the request params
    const { id } = req.params;

    //Get the product data from the request body
    const { name, description, price, stock, image, categoryId } = req.body;

    //Get the user id from the request
    const userId = req.user.id;

    //Check if the body not empty
    if (Object.keys(req.body).length === 0) {
      throw new ErrorHandler(400, "Please provide data to update");
    }

    //Take just the values that are not empty
    const productData = {
      name,
      description,
      price,
      stock,
      image,
      categoryId,
    };

    //Remove the empty values
    Object.keys(productData).forEach(
      (key) =>
        (productData[key] === undefined ||
          productData[key] === "" ||
          productData[key] === 0) &&
        delete productData[key]
    );

    //Check if the price is not empty and a numbers
    if (productData.price && isNaN(productData.price)) {
      throw new ErrorHandler(400, "Price must be numbers");
    }

    //Check if the stock is not empty and a numbers
    if (productData.stock && isNaN(productData.stock)) {
      throw new ErrorHandler(400, "Stock must be numbers");
    }

    //Check if the price is not empty and a positive numbers
    if (productData.price && productData.price < 0) {
      throw new ErrorHandler(400, "Price must be positive numbers");
    }

    //Check if the stock is not empty and a positive numbers
    if (productData.stock && productData.stock < 0) {
      throw new ErrorHandler(400, "Stock must be positive numbers");
    }

    //Check if the price are greater than 0
    if (productData.price && productData.price <= 0) {
      throw new ErrorHandler(400, "Price must be greater than 0");
    }

    //Check if the stock are greater than 0
    if (productData.stock && productData.stock <= 0) {
      throw new ErrorHandler(400, "Stock must be greater than 0");
    }

    //Check if the name is a string
    if (productData.name && typeof productData.name !== "string") {
      throw new ErrorHandler(400, "Name must be a string");
    }

    //Check if the product exists
    const product = await getOneProductService(id);
    if (!product) {
      throw new ErrorHandler(404, "Product not found");
    }

    //Update the product
    const updatedProduct = await updateProductService(
      id,
      productData.name,
      productData.description,
      productData.price,
      productData.stock,
      productData.image,
      productData.categoryId
    );

    //Return the product
    handleSuccess(res, updatedProduct, 200, "Product updated successfully");
  } catch (error) {
    handleError(res, error);
  }
};

//Delete a product
const deleteProduct = async (req, res) => {
  try {
    //Get the product ID from the request params
    const { id } = req.params;

    //Get the user id from the request
    const userId = req.user.id;

    //Check if the product exists
    const product = await getOneProductService(id);
    if (!product) {
      throw new ErrorHandler(404, "Product not found");
    }

    //Check if the user is the owner of the product
    if (product.userId !== userId) {
      throw new ErrorHandler(
        403,
        "You are not authorized to delete this product"
      );
    }

    //Delete the product
    await deleteProductService(id);

    //Return the product
    handleSuccess(res, null, 200, "Product deleted successfully");
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = {
  getAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
