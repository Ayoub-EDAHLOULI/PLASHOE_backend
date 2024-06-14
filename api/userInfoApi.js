const { ErrorHandler, handleError } = require("../utils/errorHandler");
const { handleSuccess } = require("../utils/successHandler");

//User Services
const {
  getAllUsersInfoService,
  createUserInfoService,
  getUserInfoService,
} = require("../services/userInfoServices");

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

//GET user info
const getUserInfo = async (req, res) => {
  try {
    //Get the user id
    const userId = req.user.id;

    //Get the user info
    const userInfo = await getUserInfoService(userId);

    //Check if there is no user info
    if (!userInfo) {
      throw new ErrorHandler(404, "No user info found");
    }

    //Return the user info
    handleSuccess(res, userInfo);
  } catch (error) {
    handleError(res, new ErrorHandler(500, error.message));
  }
};

//POST create user info
const createUserInfo = async (req, res) => {
  try {
    //Get the user id
    const userId = req.user.id;

    //Get the user info data from the request body
    let { firstname, lastname, phone } = req.body;

    //Check if the information is not empty and if it empty transform it to null
    firstname = firstname ? firstname : null;
    lastname = lastname ? lastname : null;
    phone = phone ? phone : null;

    //Check if the phone number is valid
    if (phone) {
      if (phone.length !== 10) {
        throw new ErrorHandler(400, "Phone number must be 10 digits");
      }
    }

    //Create the user info
    const userInfo = await createUserInfoService(
      userId,
      firstname,
      lastname,
      phone
    );

    //Return the user info
    handleSuccess(res, userInfo);
  } catch (error) {
    handleError(res, new ErrorHandler(500, error.message));
  }
};

module.exports = { getAllUsersInfo, createUserInfo, getUserInfo };
