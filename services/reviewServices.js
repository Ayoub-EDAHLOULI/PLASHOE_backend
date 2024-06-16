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

//GET product reviews
const getProductReviewsService = async (productId) => {
  try {
    const reviews = await prisma.review.findMany({
      where: {
        productId: productId,
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });

    return reviews;
  } catch (error) {
    throw new ErrorHandler(500, error.message);
  }
};

//Update review
const updateReviewService = async (reviewId, rating, review) => {
  try {
    const updatedReview = await prisma.review.update({
      where: {
        id: reviewId,
      },
      data: {
        rating,
        review,
      },
    });

    return updatedReview;
  } catch (error) {
    throw new ErrorHandler(500, error.message);
  }
};

//GET reviews by reviewId
const getReviewService = async (reviewId) => {
  try {
    const review = await prisma.review.findUnique({
      where: {
        id: reviewId,
      },
    });

    return review;
  } catch (error) {
    throw new ErrorHandler(500, error.message);
  }
};

//DELETE review
const deleteReviewService = async (reviewId) => {
  try {
    const deletedReview = await prisma.review.delete({
      where: {
        id: reviewId,
      },
    });

    return deletedReview;
  } catch (error) {
    throw new ErrorHandler(500, error.message);
  }
};

module.exports = {
  createReviewService,
  getProductReviewsService,
  updateReviewService,
  getReviewService,
  deleteReviewService,
};
