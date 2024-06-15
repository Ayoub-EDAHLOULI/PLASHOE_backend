const prisma = require("../server");

const { ErrorHandler } = require("../utils/errorHandler");

//POST create order item
const createOrderItemService = async (
  orderId,
  productId,
  quantity,
  price,
  subtotal
) => {
  try {
    const orderItem = await prisma.orderItem.create({
      data: {
        quantity,
        price,
        subtotal,
        order: {
          connect: {
            id: orderId,
          },
        },
        product: {
          connect: {
            id: productId,
          },
        },
      },
    });

    //Return the order item
    return orderItem;
  } catch (error) {
    throw new ErrorHandler(500, error.message);
  }
};

//GET the user card items
const getUserCardItemsService = async (userId) => {
  try {
    const cardItems = await prisma.orderItem.findMany({
      where: {
        userId,
      },
      include: {
        product: true,
      },
    });

    //Return the card items
    return cardItems;
  } catch (error) {
    throw new ErrorHandler(500, error.message);
  }
};

module.exports = {
  createOrderItemService,
  getUserCardItemsService,
};
