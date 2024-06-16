const { ErrorHandler, handleError } = require("../utils/errorHandler");
const { handleSuccess } = require("../utils/successHandler");

//Review Services
const {
  createReviewService,
  getProductReviewsService,
} = require("../services/reviewServices");
const { getOneProductService } = require("../services/productServices");

//POST create review
const createReview = async (req, res) => {
  try {
    //Get the userId
    const userId = req.user.id;

    //Get the productId, rating and review from the request body
    const { productId, rating, review } = req.body;

    //Check if the rating and comment are not empty if they are transform them to null
    const reviewRating = rating ? rating : null;
    const reviewComment = review ? review : null;

    //Check if the rating is between 1 and 5
    if (rating && (rating < 1 || rating > 5)) {
      throw new ErrorHandler(400, "Rating must be between 1 and 5");
    }

    //Check if the productId is a number
    if (isNaN(productId)) {
      throw new ErrorHandler(400, "Product id must be a number");
    }

    //Check if the product exists
    const product = await getOneProductService(productId);

    if (!product) {
      throw new ErrorHandler(404, "Product not found");
    }

    //Create the review
    const reviewData = await createReviewService(
      userId,
      productId,
      reviewRating,
      reviewComment
    );

    //Return the review
    handleSuccess(res, reviewData, 201, "Review created successfully");
  } catch (error) {
    handleError(res, error);
  }
};

//GET product reviews
const getProductReviews = async (req, res) => {
  try {
    //Get the productId from the request params
    const productId = Number(req.params.id);

    //Check if the productId is a number
    if (isNaN(productId)) {
      throw new ErrorHandler(400, "Product id must be a number");
    }

    //Check if the product exists
    const product = await getOneProductService(productId);

    if (!product) {
      throw new ErrorHandler(404, "Product not found");
    }

    //Get the product reviews
    const reviews = await getProductReviewsService(productId);

    if (reviews.length === 0) {
      throw new ErrorHandler(404, "No reviews found for this product");
    }

    //Return the reviews
    handleSuccess(res, reviews, 200, "Product reviews retrieved successfully");
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = { createReview, getProductReviews };
