const { ErrorHandler, handleError } = require("../utils/errorHandler");
const { handleSuccess } = require("../utils/successHandler");

//Product Services
const {
  getAllProductsService,
  getOneProductService,
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

module.exports = { getAllProducts, getOneProduct };
