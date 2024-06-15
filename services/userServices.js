//User Services
const prisma = require("../server");

//Error Handler
const { ErrorHandler } = require("../utils/errorHandler");

//GET all users
const getAllUsersService = async () => {
  try {
    const users = await prisma.user.findMany();

    //Return the users
    return users;
  } catch (error) {
    throw new ErrorHandler(500, error.message);
  }
};

//GET one user
const getOneUserService = async (id) => {
  try {
    //Check if user exists
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    //Return the user
    return user;
  } catch (error) {
    throw new ErrorHandler(500, error.message);
  }
};

//POST create user
const createUserService = async (username, lowerCaseEmail, hashedPassword) => {
  try {
    //Create the user
    const newUser = await prisma.user.create({
      data: {
        username,
        email: lowerCaseEmail,
        password: hashedPassword,
      },
    });

    //Return the user
    return newUser;
  } catch (error) {
    throw new ErrorHandler(500, error.message);
  }
};

//Check if email is already in use
const checkEmail = async (email) => {
  try {
    const emailExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return emailExists;
  } catch (error) {
    throw new ErrorHandler(500, error.message);
  }
};

//PUT update user
const updateUserService = async (id, username, email) => {
  try {
    //Update the user
    const updatedUser = await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: {
        username,
        email,
      },
    });

    //Return the updated user
    return updatedUser;
  } catch (error) {
    throw new ErrorHandler(500, error.message);
  }
};

//DELETE user
const deleteUserService = async (id) => {
  try {
    //Delete the user
    await prisma.user.delete({
      where: {
        id: parseInt(id),
      },
    });

    //Return success message
    return "User deleted successfully";
  } catch (error) {
    throw new ErrorHandler(500, error.message);
  }
};

//Export the modules
module.exports = {
  getAllUsersService,
  getOneUserService,
  createUserService,
  checkEmail,
  updateUserService,
  deleteUserService,
};
