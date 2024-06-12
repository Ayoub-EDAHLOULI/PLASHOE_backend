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
const createCategoryService = async (name) => {
  try {
    const newCategory = await prisma.category.create({
      data: {
        name,
      },
    });

    //Return the new category
    return newCategory;
  } catch (error) {
    throw new ErrorHandler(500, error.message);
  }
};

module.exports = { getAllCategoriesService, createCategoryService };
