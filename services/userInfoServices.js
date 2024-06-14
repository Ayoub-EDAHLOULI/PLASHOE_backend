//User Services
const prisma = require("../server");

const { ErrorHandler } = require("../utils/errorHandler");

//GET all users info
const getAllUsersInfoService = async () => {
  try {
    const usersInfo = await prisma.userInfo.findMany();

    //Return the users
    return usersInfo;
  } catch (error) {
    throw new ErrorHandler(500, error.message);
  }
};

//POST create user info
const createUserInfoService = async (userId, firstname, lastname, phone) => {
  try {
    const userInfo = await prisma.userInfo.create({
      data: {
        firstname,
        lastname,
        phone,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    //Return the user info
    return userInfo;
  } catch (error) {
    throw new ErrorHandler(500, error.message);
  }
};

//GET user info
const getUserInfoService = async (userId) => {
  try {
    const userInfo = await prisma.userInfo.findUnique({
      where: {
        userId,
      },
    });

    //Return the user info
    return userInfo;
  } catch (error) {
    throw new ErrorHandler(500, error.message);
  }
};

module.exports = {
  getAllUsersInfoService,
  createUserInfoService,
  getUserInfoService,
};
