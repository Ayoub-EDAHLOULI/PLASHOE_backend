const { ErrorHandler, handleError } = require("../utils/errorHandler");
const { handleSuccess } = require("../utils/successHandler");

//Card Services
const {
  createCardService,
  getUserCardService,
  updateCardService,
  deleteCardService,
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

//PUT update card
const updateCard = async (req, res) => {
  try {
    //Get the cardId from the request params
    const cardId = Number(req.params.id);

    //Get the userId
    const userId = req.user.id;

    //Get the quantity from the request body
    const { productId, quantity } = req.body;

    //Check if the cardId and quantity are not empty
    if (!cardId || !quantity) {
      throw new ErrorHandler(400, "Card id and quantity are required");
    }

    //Check if the quantity is a number
    if (isNaN(quantity)) {
      throw new ErrorHandler(400, "Quantity must be a number");
    }

    //Check if the quantity is greater than 0
    if (quantity <= 0) {
      throw new ErrorHandler(400, "Quantity must be greater than 0");
    }

    //Fetch the card from the database
    const cardItem = await getUserCardService(userId, cardId);
    if (!cardItem) {
      throw new ErrorHandler(404, "Card not found");
    }

    //Calculate the change in quantity
    const quantityChange = quantity - cardItem[0].quantity;

    //Fetch the product from the database
    const product = await getOneProductService(productId);

    //Check if theire is enough stock to update the card quantity if the quantity is increased
    if (quantityChange > 0) {
      if (product.stock < quantityChange) {
        throw new ErrorHandler(400, "The stock is not enough");
      }
    }

    //Update the card
    const card = await updateCardService(cardId, quantity);

    //Update the product stock

    quantityChange > 0
      ? (product.stock -= quantityChange)
      : (product.stock += Math.abs(quantityChange));

    await updateProductStockService(product.id, product.stock);

    //Return the card
    handleSuccess(res, card, 200, "Card updated successfully");
  } catch (error) {
    handleError(res, error);
  }
};

//DELETE a card
const deleteCard = async (req, res) => {
  try {
    //Get the cardId from the request params
    const cardId = Number(req.params.id);

    //Get the userId
    const userId = req.user.id;

    //Fetch the card from the database
    const cardItem = await getUserCardService(userId, cardId);
    if (!cardItem) {
      throw new ErrorHandler(404, "Card not found");
    }

    //Delete the card
    await deleteCardService(cardId);

    //Return the card
    handleSuccess(res, null, 200, "Card deleted successfully");
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = { createCard, getUserCard, updateCard, deleteCard };
