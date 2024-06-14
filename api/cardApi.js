const { ErrorHandler, handleError } = require("../utils/errorHandler");
const { handleSuccess } = require("../utils/successHandler");

//Card Services
const {
  createCardService,
  getUserCardService,
} = require("../services/cardServices");
const {
  getOneProductService,
  updateProductStockService,
} = require("../services/productServices");

//POST create card
const createCard = async (req, res) => {
  try {
    //Get the userId
    const userId = req.user.id;

    //Get the userId, productId and quantity from the request body
    const { productId, quantity } = req.body;

    console.log(req.body);

    //Check if the productId and quantity are not empty
    if (!productId || !quantity) {
      throw new ErrorHandler(400, "Product id and quantity are required");
    }

    //Check if the quantity is a number
    if (isNaN(quantity)) {
      throw new ErrorHandler(400, "Quantity must be a number");
    }

    //Check if the quantity is greater than 0
    if (quantity <= 0) {
      throw new ErrorHandler(400, "Quantity must be greater than 0");
    }

    //Check if the productId is a number
    if (isNaN(productId)) {
      throw new ErrorHandler(400, "Product id must be a number");
    }

    //Check if the stock is greater than the quantity
    const product = await getOneProductService(productId);

    if (!product) {
      throw new ErrorHandler(404, "Product not found");
    }

    if (product.stock < quantity) {
      throw new ErrorHandler(400, "The stock is not enough");
    }

    //Create the card
    const card = await createCardService(userId, productId, quantity);

    //Decrease the product stock
    const newStock = product.stock - quantity;
    await updateProductStockService(productId, newStock);

    //Return the card
    handleSuccess(res, card, 201, "Card created successfully");
  } catch (error) {
    handleError(res, error);
  }
};

//GET the cards of a user
const getUserCard = async (req, res) => {
  try {
    //Get the userId
    const userId = req.user.id;

    //Get the user card
    const card = await getUserCardService(userId);

    //Return the card
    handleSuccess(res, card, 200, "User card retrieved successfully");
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = { createCard, getUserCard };
