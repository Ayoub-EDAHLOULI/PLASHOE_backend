const prisma = require("../server");

const { ErrorHandler } = require("../utils/errorHandler");

//POST create order
const createOrderService = async (userId, order_date, total, shipping_date) => {
  try {
    const order = await prisma.order.create({
      data: {
        order_date,
        total,
        shipping_date,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    //Return the order
    return order;
  } catch (error) {
    throw new ErrorHandler(500, error.message);
  }
};

module.exports = {
  createOrderService,
};
