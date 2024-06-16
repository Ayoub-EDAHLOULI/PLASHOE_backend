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

module.exports = {
  createPaymentService,
};
