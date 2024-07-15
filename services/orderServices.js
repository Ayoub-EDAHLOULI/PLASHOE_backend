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

//GET the user orders
const getUserOrdersService = async (userId) => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        userId,
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    //Return the orders
    return orders;
  } catch (error) {
    throw new ErrorHandler(500, error.message);
  }
};

//Get the order by id
const getOrderByIdService = async (orderId) => {
  try {
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        orderItems: {
          include: {
            product: true,
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

// Decrease the stock of the products
const decreaseProductStockService = async (productId, quantity) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    const newStock = product.stock - quantity;

    await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        stock: newStock,
      },
    });
  } catch (error) {
    throw new ErrorHandler(500, error.message);
  }
};

module.exports = {
  createOrderService,
  getUserOrdersService,
  getOrderByIdService,
  decreaseProductStockService,
};
