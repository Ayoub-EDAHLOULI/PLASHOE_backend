const { ErrorHandler, handleError } = require("../utils/errorHandler");
const { handleSuccess } = require("../utils/successHandler");

//Product Services
const { getAllProductsService } = require("../services/productServices");

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

module.exports = { getAllProducts };
