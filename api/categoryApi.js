const { ErrorHandler, handleError } = require("../utils/errorHandler");
const { handleSuccess } = require("../utils/successHandler");

//Product Services
const { getAllProductsService } = require("../services/productServices");

//GET all categories
const getAllCategories = async (req, res) => {
  try {
    //Get all categories
    const categories = await getAllProductsService();

    //Return the categories
    handleSuccess(res, categories, 200, "Categories retrieved successfully");
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = { getAllCategories };
