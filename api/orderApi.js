const { ErrorHandler, handleError } = require("../utils/errorHandler");
const { handleSuccess } = require("../utils/successHandler");

//Order Services
const { createOrderService } = require("../services/orderServices");
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

    //Clear the user cart
    await clearUserCardService(userId);

    //Return the order
    handleSuccess(201, "Order created successfully", order, res);
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = {
  createOrder,
};
