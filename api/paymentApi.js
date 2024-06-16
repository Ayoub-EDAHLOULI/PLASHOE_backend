const { ErrorHandler, handleError } = require("../utils/errorHandler");
const { handleSuccess } = require("../utils/successHandler");

//Payment Services
const {
  createPaymentService,
  getAllPaymentsService,
} = require("../services/paymentServices");
const { getOrderByIdService } = require("../services/orderServices");
const { clearUserCardService } = require("../services/cardServices");

//POST create payment
const createPayment = async (req, res) => {
  try {
    //Get the userId
    const userId = req.user.id;

    //Get the orderId, amount and payment_method from the request body
    const { orderId, payment_method } = req.body;

    //Check if the orderId is a number
    if (isNaN(orderId)) {
      throw new ErrorHandler(400, "Order id must be a number");
    }

    //Get the order
    const order = await getOrderByIdService(orderId);

    //Check if the order exists
    if (!order) {
      throw new ErrorHandler(404, "Order not found");
    }
    //Get the order amount
    const amount = order.total;

    //Get the current date
    const payment_date = new Date();

    //Create the payment
    const paymentData = await createPaymentService(
      userId,
      orderId,
      payment_date,
      amount,
      payment_method
    );

    //Clear the user cart
    // await clearUserCardService(userId);

    //Return the payment
    handleSuccess(res, paymentData, 201, "Payment created successfully");
  } catch (error) {
    handleError(res, error);
  }
};

//GET all payments
const getAllPayments = async (req, res) => {
  try {
    //Get all payments
    const payments = await getAllPaymentsService();

    //Return the payments
    handleSuccess(res, payments, 200, "Payments retrieved successfully");
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = {
  createPayment,
  getAllPayments,
};
