const { ErrorHandler, handleError } = require("../utils/errorHandler");
const { handleSuccess } = require("../utils/successHandler");

//Product Services
const {
  getAllCategoriesService,
  createCategoryService,
} = require("../services/categoryServices");

//GET all categories
const getAllCategories = async (req, res) => {
  try {
    //Get all categories
    const categories = await getAllCategoriesService();

    //Return the categories
    handleSuccess(res, categories, 200, "Categories retrieved successfully");
  } catch (error) {
    handleError(res, error);
  }
};

//POST a new category
const createCategory = async (req, res) => {
  try {
    //Get the category data from the request body
    const { name } = req.body;

    //Check if the name is provided
    if (!name) {
      throw new ErrorHandler(400, "Please provide a name");
    }

    //Create the category
    const newCategory = await createCategoryService(name);

    //Return the new category
    handleSuccess(res, newCategory, 201, "Category created successfully");
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = { getAllCategories, createCategory };
