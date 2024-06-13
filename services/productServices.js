const prisma = require("../server");
const { ErrorHandler } = require("../utils/errorHandler");

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

//POST a new product
const createProductService = async (
  name,
  description,
  price,
  stock,
  userId,
  categoryId
) => {
  try {
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price,
        stock,
        userId,
        categoryId,
      },
    });

    //Return the new product
    return newProduct;
  } catch (error) {
    throw new ErrorHandler(500, error.message);
  }
};

//Check if a product already exists
const checkProduct = async (name) => {
  const product = await prisma.product.findFirst({
    where: {
      name,
    },
  });

  return product ? true : false;
};

//Update a product
const updateProductService = async (
  id,
  name,
  description,
  price,
  stock,
  categoryId
) => {
  try {
    const updatedProduct = await prisma.product.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        description,
        price,
        stock,
        categoryId,
      },
    });

    //Return the updated product
    return updatedProduct;
  } catch (error) {
    throw new ErrorHandler(500, error.message);
  }
};

module.exports = {
  getAllProductsService,
  getOneProductService,
  createProductService,
  checkProduct,
  updateProductService,
};
