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

//GET a single product
const getOneProductService = async (id) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    //Return the product
    return product;
  } catch (error) {
    throw new ErrorHandler(500, error.message);
  }
};

module.exports = { getAllProductsService, getOneProductService };
