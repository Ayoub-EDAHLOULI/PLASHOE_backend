//User Services
const prisma = require("../server");

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

module.exports = { getAllUsersInfoService };
