//User Services
const prisma = require("../server");

//Error Handler
const { ErrorHandler } = require("../utils/errorHandler");

//POST create payment
const createPaymentService = async (
  userId,
  orderId,
  payment_date,
  amount,
  payment_method
) => {
  try {
    const paymentData = await prisma.payment.create({
      data: {
        payment_date,
        amount,
        payment_method,
        user: {
          connect: {
            id: userId,
          },
        },
        order: {
          connect: {
            id: orderId,
          },
        },
      },
    });

    //Return the payment
    return paymentData;
  } catch (error) {
    throw new ErrorHandler(500, error.message);
  }
};

//GET all payments
const getAllPaymentsService = async () => {
  try {
    const payments = await prisma.payment.findMany({
      include: {
        user: true,
        order: true,
      },
    });

    //Return the payments
    return payments;
  } catch (error) {
    throw new ErrorHandler(500, error.message);
  }
};

//GET payment by id
const getPaymentByIdService = async (paymentId) => {
  try {
    const payment = await prisma.payment.findUnique({
      where: {
        id: paymentId,
      },
      include: {
        user: true,
        order: true,
      },
    });

    //Return the payment
    return payment;
  } catch (error) {
    throw new ErrorHandler(500, error.message);
  }
};

//UPDATE payment
const updatePaymentService = async (paymentId, payment_method) => {
  try {
    const payment = await prisma.payment.update({
      where: {
        id: paymentId,
      },
      data: {
        payment_method,
        payment_date: new Date(),
      },
    });

    //Return the payment
    return payment;
  } catch (error) {
    throw new ErrorHandler(500, error.message);
  }
};

module.exports = {
  createPaymentService,
  getAllPaymentsService,
  getPaymentByIdService,
  updatePaymentService,
};
