//Error handler class
class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

//Error handler middleware
const handleError = (res, err) => {
  const { statusCode = 500, message = "An error occured" } = err;
  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};

module.exports = { ErrorHandler, handleError };
