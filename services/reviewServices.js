//User Services
const prisma = require("../server");

//Error Handler
const { ErrorHandler } = require("../utils/errorHandler");

//POST create review
const createReviewService = async (userId, productId, rating, review) => {
  try {
    const reviewData = await prisma.review.create({
      data: {
        rating,
        review,
        user: {
          connect: {
            id: userId,
          },
        },
        product: {
          connect: {
            id: productId,
          },
        },
      },
    });

    //Return the review
    return reviewData;
  } catch (error) {
    throw new ErrorHandler(500, error.message);
  }
};

module.exports = { createReviewService };
