const prisma = require("../server");

const { ErrorHandler } = require("../utils/errorHandler");

//POST create card
const createCardService = async (userId, productId, quantity) => {
  try {
    const card = await prisma.cart.create({
      data: {
        quantity,
        user: {
          connect: {
            id: userId,
          },
        },
        product: {
          connect: {
            id: productId,
          },
        },
      },
    });

    //Return the card
    return card;
  } catch (error) {
    throw new ErrorHandler(500, error.message);
  }
};

//GET the user card
const getUserCardService = async (userId, cardId) => {
  try {
    const card = await prisma.cart.findMany({
      where: {
        userId,
        id: cardId,
      },
      include: {
        product: true,
      },
    });

    //Return the card
    return card;
  } catch (error) {
    throw new ErrorHandler(500, error.message);
  }
};

//Update the card
const updateCardService = async (cardId, quantity) => {
  try {
    const card = await prisma.cart.update({
      where: {
        id: cardId,
      },
      data: {
        quantity,
      },
    });

    //Return the card
    return card;
  } catch (error) {
    throw new ErrorHandler(500, error.message);
  }
};

//Delete the card
const deleteCardService = async (cardId) => {
  try {
    const card = await prisma.cart.delete({
      where: {
        id: cardId,
      },
    });

    //Return the card
    return card;
  } catch (error) {
    throw new ErrorHandler(500, error.message);
  }
};

module.exports = {
  createCardService,
  getUserCardService,
  updateCardService,
  deleteCardService,
};
