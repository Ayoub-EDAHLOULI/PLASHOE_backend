const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { ErrorHandler, handleError } = require("../utils/errorHandler");

//Middleware to check if the user is authenticated
const isAuthenticated = async (req, res, next) => {
  //Authorization: Bearer token
  const bearerHeader = req.headers["authorization"];

  if (!bearerHeader || !bearerHeader.startsWith("Bearer "))
    throw new ErrorHandler(400, "Access denied. No token provided");

  const token = bearerHeader.split(" ")[1];

  //Check if the token exists
  if (!token) throw new ErrorHandler(400, "Access denied. No token provided");

  try {
    //Verify the token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    //Set the user id in the request
    req.user = {
      id: decoded.id,
      username: decoded.username,
      email: decoded.email,
      role: decoded.role,
      iat: decoded.iat, //Issued at
      exp: decoded.exp, //Expires
    };

    next();
  } catch (error) {
    handleError(res, error);
  }
};

//Authorization
//Middleware to check if user is authorized
const isAuthorized = (...roles) => {
  return async (req, res, next) => {
    if (!req.user)
      handleError(res, new ErrorHandler(401, " You are not authenticated"));

    //Check if the user role is in the roles array
    if (!roles.includes(req.user.role))
      handleError(
        res,
        new ErrorHandler(403, "You are not authorized to perform this action")
      );

    next();
  };
};

module.exports = { isAuthenticated, isAuthorized };
