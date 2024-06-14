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

module.exports = { createCardService };