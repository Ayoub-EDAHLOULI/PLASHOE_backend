const { ErrorHandler, handleError } = require("../utils/errorHandler");
const { handleSuccess } = require("../utils/successHandler");

//User Services
const { getAllUsersInfoService } = require("../services/userInfoServices");

//GET all users info
const getAllUsersInfo = async (req, res) => {
  try {
    const usersInfo = await getAllUsersInfoService();

    //Check if there are no users
    if (!usersInfo) {
      throw new ErrorHandler(404, "No users found");
    }

    //Return the users
    handleSuccess(res, usersInfo);
  } catch (error) {
    handleError(res, new ErrorHandler(500, error.message));
  }
};

module.exports = { getAllUsersInfo };
