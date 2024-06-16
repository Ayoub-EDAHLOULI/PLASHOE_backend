const { ErrorHandler, handleError } = require("../utils/errorHandler");
const { handleSuccess } = require("../utils/successHandler");

//Review Services
const {
  createReviewService,
  getProductReviewsService,
  updateReviewService,
  getReviewService,
  deleteReviewService,
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

//Update review
const updateReview = async (req, res) => {
  try {
    //Get the reviewId from the request params
    const reviewId = Number(req.params.id);

    //Get the rating and review from the request body
    const { rating, review } = req.body;

    //Check if the user is the owner of the review
    const reviewDataCheck = await getReviewService(reviewId);

    if (req.user.id !== reviewDataCheck.userId) {
      throw new ErrorHandler(
        403,
        "You are not authorized to perform this action"
      );
    }

    //Check if the rating and comment are not empty
    if (Object.keys(req.body).length === 0) {
      throw new ErrorHandler(400, "Rating or review is required");
    }

    const reviewData = {
      rating,
      review,
    };

    //Remove the empty fields from the request body
    Object.keys(reviewData).forEach(
      (key) => reviewData[key] === undefined && delete reviewData[key]
    );

    //Check if the rating is between 1 and 5
    if (reviewData.rating && (reviewData.rating < 1 || reviewData.rating > 5)) {
      throw new ErrorHandler(400, "Rating must be between 1 and 5");
    }

    //Update the review
    const updatedReview = await updateReviewService(
      reviewId,
      reviewData.rating,
      reviewData.review
    );

    //Return the updated review
    handleSuccess(res, updatedReview, 200, "Review updated successfully");
  } catch (error) {
    handleError(res, error);
  }
};

//DELETE review
const deleteReview = async (req, res) => {
  try {
    //Get the reviewId from the request params
    const reviewId = Number(req.params.id);

    //Check if the review exists
    const review = await getReviewService(reviewId);
    if (!review) {
      throw new ErrorHandler(404, "Review not found");
    }

    //Check if the user is the owner of the review
    const reviewDataCheck = await getReviewService(reviewId);

    if (req.user.id !== reviewDataCheck.userId) {
      throw new ErrorHandler(
        403,
        "You are not authorized to perform this action"
      );
    }

    //Delete the review
    const deletedReview = await deleteReviewService(reviewId);

    //Return the deleted review
    handleSuccess(res, deletedReview, 200, "Review deleted successfully");
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = {
  createReview,
  getProductReviews,
  updateReview,
  deleteReview,
};
