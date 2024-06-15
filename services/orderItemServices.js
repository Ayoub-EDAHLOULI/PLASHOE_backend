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

module.exports = {
  createOrderItemService,
};
