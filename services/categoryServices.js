const prisma = require("../server");
const { ErrorHandler } = require("../utils/errorHandler");

//GET all categories
const getAllCategoriesService = async () => {
  try {
    const categories = await prisma.category.findMany();

    //Return the categories
    return categories;
  } catch (error) {
    throw new ErrorHandler(500, error.message);
  }
};

//POST a new category
const createCategoryService = async (name, userId) => {
  try {
    const newCategory = await prisma.category.create({
      data: {
        name,
        userId,
      },
    });

    //Return the new category
    return newCategory;
  } catch (error) {
    throw new ErrorHandler(500, error.message);
  }
};

//Check if a category already exists
const checkCategory = async (name) => {
  try {
    const category = await prisma.category.findFirst({
      where: {
        name,
      },
    });

    return category;
  } catch (error) {
    throw new ErrorHandler(500, error.message);
  }
};

//GET a single category
const getOneCategoryService = async (id) => {
  try {
    const category = await prisma.category.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    //Return the category
    return category;
  } catch (error) {
    throw new ErrorHandler(500, error.message);
  }
};

//Update a category
const updateCategoryService = async (id, name) => {
  try {
    const updatedCategory = await prisma.category.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
      },
    });

    //Return the updated category
    return updatedCategory;
  } catch (error) {
    throw new ErrorHandler(500, error.message);
  }
};

//DELETE a category
const deleteCategoryService = async (id) => {
  try {
    const deletedCategory = await prisma.category.delete({
      where: {
        id: parseInt(id),
      },
    });

    //Return the deleted category
    return deletedCategory;
  } catch (error) {
    throw new ErrorHandler(500, error.message);
  }
};

module.exports = {
  getAllCategoriesService,
  createCategoryService,
  getOneCategoryService,
  checkCategory,
  updateCategoryService,
  deleteCategoryService,
};
