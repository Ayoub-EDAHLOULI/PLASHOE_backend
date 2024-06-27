const { ErrorHandler, handleError } = require("../utils/errorHandler");
const { handleSuccess } = require("../utils/successHandler");

//Product Services
const {
  getAllCategoriesService,
  createCategoryService,
  getOneCategoryService,
  checkCategory,
  updateCategoryService,
  deleteCategoryService,
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

//GET a single category
const getOneCategory = async (req, res) => {
  try {
    //Get the category ID from the request params
    const { id } = req.params;

    //Get the category
    const category = await getOneCategoryService(id);

    //Check if the category exists
    if (!category) {
      throw new ErrorHandler(404, "Category not found");
    }

    //Return the category
    handleSuccess(res, category, 200, "Category retrieved successfully");
  } catch (error) {
    handleError(res, error);
  }
};

//POST a new category
const createCategory = async (req, res) => {
  try {
    //Get the category data from the request body
    const { name } = req.body;

    //Get the userId from the request
    const userId = req.user.id;

    //Check if the name is provided
    if (!name) {
      throw new ErrorHandler(400, "Please provide a name");
    }

    //Check if the category already exists
    const categoryExists = await checkCategory(name);
    if (categoryExists) {
      throw new ErrorHandler(400, "Category already exists");
    }

    //Create the category
    const newCategory = await createCategoryService(name, userId);

    //Return the new category
    handleSuccess(res, newCategory, 201, "Category created successfully");
  } catch (error) {
    handleError(res, error);
  }
};

//Update a category
const updateCategory = async (req, res) => {
  try {
    //Get the category ID from the request params
    const { id } = req.params;

    //Get the category data from the request body
    const { name } = req.body;

    //Switch Id to Number
    const categoryId = Number(id);

    //Check if the name is provided
    if (!name) {
      throw new ErrorHandler(400, "Please provide a name");
    }

    //Check if the name is the same as the current one
    const category = await getOneCategoryService(categoryId);
    if (category.name === name) {
      throw new ErrorHandler(
        400,
        "Category name is the same as the current one"
      );
    }

    //Check if the category already exists
    const categoryExists = await checkCategory(name);
    if (categoryExists) {
      throw new ErrorHandler(400, "Category already exists");
    }

    //Update the category
    const updatedCategory = await updateCategoryService(categoryId, name);

    //Return the updated category
    handleSuccess(res, updatedCategory, 200, "Category updated successfully");
  } catch (error) {
    handleError(res, error);
  }
};
//DELETE a category
const deleteCategory = async (req, res) => {
  try {
    //Get the category ID from the request params
    const { id } = req.params;

    //Check if the category exists
    const category = await getOneCategoryService(id);
    if (!category) {
      throw new ErrorHandler(404, "Category not found");
    }

    //Delete the category
    await deleteCategoryService(id);

    //Return the success message
    handleSuccess(res, null, 200, "Category deleted successfully");
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = {
  getAllCategories,
  createCategory,
  getOneCategory,
  updateCategory,
  deleteCategory,
};
