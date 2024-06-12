const { ErrorHandler, handleError } = require("../utils/errorHandler");
const { handleSuccess } = require("../utils/successHandler");

//Product Services
const {
  getAllProductsService,
  getOneProductService,
  createProductService,
  checkProduct,
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

//Create a new product
const createProduct = async (req, res) => {
  try {
    //Get the product data from the request body
    const { name, description, price, stock, categoryId } = req.body;

    //Get the user id from the request
    const userId = req.user.id;

    console.log("User ID", userId);

    //Check if name, price, description and stock are provided
    if (!name || !price || !description || !stock) {
      throw new ErrorHandler(
        400,
        "Please provide name, price, description and stock"
      );
    }

    console.log(name, price, description, stock);

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
      console.log("ProductExists", productExists);
      throw new ErrorHandler(400, "Product already exists");
    }

    //Create the product
    const newProduct = await createProductService(
      name,
      description,
      price,
      stock,
      userId,
      categoryId
    );

    //Return the product
    handleSuccess(res, newProduct, 201, "Product created successfully");
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = { getAllProducts, getOneProduct, createProduct };
