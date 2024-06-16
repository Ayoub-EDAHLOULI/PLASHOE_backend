const { ErrorHandler, handleError } = require("../utils/errorHandler");
const { handleSuccess } = require("../utils/successHandler");

//Order Services
const {
  createOrderService,
  getUserOrdersService,
  getOrderByIdService,
} = require("../services/orderServices");
const {
  getUserCardByIdService,
  clearUserCardService,
} = require("../services/cardServices");
const { createOrderItemService } = require("../services/orderItemServices");

//POST create order
const createOrder = async (req, res) => {
  try {
    //Get the userId from the request
    const userId = req.user.id;

    //Create the shipping date
    const shipping_date = new Date();
    shipping_date.setDate(shipping_date.getDate() + 7);

    console.log("Shipping Date =================>", shipping_date);

    //Get the current date
    const order_date = new Date();

    // Fetch cart items for the user
    const cardItems = await getUserCardByIdService(userId);

    // Check if the user has items in the cart
    if (cardItems.length === 0) {
      throw new ErrorHandler(400, "No items in the cart");
    }

    // Calculate the total price
    const total = cardItems.reduce((acc, item) => {
      return acc + item.product.price * item.quantity;
    }, 0);

    //Create the order
    const order = await createOrderService(
      userId,
      order_date,
      total,
      shipping_date
    );

    //Get the order id
    const orderId = order.id;

    //Create the order items for each cart item
    for (let item of cardItems) {
      //Calculate the subtotal
      const subtotal = item.product.price * item.quantity;

      await createOrderItemService(
        orderId,
        item.productId,
        item.quantity,
        item.product.price,
        subtotal
      );
    }

    //Return the order
    handleSuccess(201, "Order created successfully", order, res);
  } catch (error) {
    handleError(res, error);
  }
};

//GET the user orders
const getUserOrders = async (req, res) => {
  try {
    //Get the userId from the request
    const userId = req.user.id;

    //Fetch the orders
    const orders = await getUserOrdersService(userId);

    //Return the orders
    handleSuccess(res, orders);
  } catch (error) {
    handleError(res, error);
  }
};

//GET the order by id
const getOrderById = async (req, res) => {
  try {
    //Get the orderId from the request params
    const orderId = Number(req.params.id);

    //Check if the orderId is a number
    if (isNaN(orderId)) {
      throw new ErrorHandler(400, "Order id must be a number");
    }

    //Fetch the order
    const order = await getOrderByIdService(orderId);

    //Check if the order exists
    if (!order) {
      throw new ErrorHandler(404, "Order not found");
    }

    //Return the order
    handleSuccess(res, order, 200, "Order retrieved successfully");
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getOrderById,
};
