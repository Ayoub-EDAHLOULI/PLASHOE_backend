const prisma = require("../server");

//GET all products
const getAllProductsService = async () => {
  try {
    const products = await prisma.product.findMany();

    //Return the products
    return products;
  } catch (error) {
    throw new ErrorHandler(500, error.message);
  }
};

module.exports = { getAllProductsService };
