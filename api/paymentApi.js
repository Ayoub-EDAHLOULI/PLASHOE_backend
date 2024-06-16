const { ErrorHandler, handleError } = require("../utils/errorHandler");
const { handleSuccess } = require("../utils/successHandler");

//Payment Services
const {
  createPaymentService,
  getAllPaymentsService,
  getPaymentByIdService,
  updatePaymentService,
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

//GET payment by id
const getPaymentById = async (req, res) => {
  try {
    //Get the paymentId
    const paymentId = Number(req.params.id);

    //Check if the paymentId is a number
    if (isNaN(paymentId)) {
      throw new ErrorHandler(400, "Payment id must be a number");
    }

    //Get the payment
    const payment = await getPaymentByIdService(paymentId);

    //Check if the payment exists
    if (!payment) {
      throw new ErrorHandler(404, "Payment not found");
    }

    //Return the payment
    handleSuccess(res, payment, 200, "Payment retrieved successfully");
  } catch (error) {
    handleError(res, error);
  }
};

//PUT update payment
const updatePayment = async (req, res) => {
  try {
    //Get the paymentId
    const paymentId = Number(req.params.id);
    const userId = req.user.id;

    //Check if the user is the owner of the payment
    const payment = await getPaymentByIdService(paymentId);

    if (payment.userId !== userId) {
      throw new ErrorHandler(
        403,
        "You are not authorized to update this payment"
      );
    }

    //Check if the paymentId is a number
    if (isNaN(paymentId)) {
      throw new ErrorHandler(400, "Payment id must be a number");
    }

    //Check if the payment exists
    if (!payment) {
      throw new ErrorHandler(404, "Payment not found");
    }

    //Get the payment_method from the request body
    const { payment_method } = req.body;

    //Update the payment
    const updatedPayment = await updatePaymentService(
      paymentId,
      payment_method
    );

    //Return the updated payment
    handleSuccess(res, updatedPayment, 200, "Payment updated successfully");
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
};
