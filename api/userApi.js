const { ErrorHandler, handleError } = require("../utils/errorHandler");
const { handleSuccess } = require("../utils/successHandler");
const bcrypt = require("bcrypt");

//User Services
const {
  getAllUsersService,
  getOneUserService,
  createUserService,
  checkEmail,
  updateUserService,
  deleteUserService,
} = require("../services/userServices");

//GET all users
const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersService();

    //Check if there are no users
    if (!users) {
      throw new ErrorHandler(404, "No users found");
    }

    //Return the users
    handleSuccess(res, users);
  } catch (error) {
    handleError(res, new ErrorHandler(500, error.message));
  }
};

//GET one user
const getOneUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await getOneUserService(id);

    //Check if the user exists
    if (!user) {
      throw new ErrorHandler(404, "User not found");
    }

    //Return the user
    handleSuccess(res, user);
  } catch (error) {
    handleError(res, new ErrorHandler(500, error.message));
  }
};

//POST create user
const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //Check if name, email and password are provided
    if (!username || !email || !password) {
      throw new ErrorHandler(
        400,
        "Please provide username, email and password"
      );
    }

    //Make the email lowercase
    const lowerCaseEmail = email.toLowerCase();

    //Check if email is valid
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      throw new ErrorHandler(400, "Please provide a valid email");
    }

    //Check if password is valid
    if (password.length < 6) {
      throw new ErrorHandler(
        400,
        "Password must be at least 6 characters long"
      );
    }

    //Check if the email exists
    const emailExists = await checkEmail(email);

    if (emailExists) {
      throw new ErrorHandler(400, "Email already exists");
    }

    //Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Create the user
    const newUser = await createUserService(
      username,
      lowerCaseEmail,
      hashedPassword
    );
    //Return the user
    handleSuccess(res, newUser, 201, "User created successfully");
  } catch (error) {
    handleError(res, error);
  }
};

//PUT update user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email } = req.body;

    //Check if name and email are provided
    if (!username || !email) {
      throw new ErrorHandler(400, "Please provide username and email");
    }

    //Check if email is valid
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      throw new ErrorHandler(400, "Please provide a valid email");
    }

    //Check if the user exists
    const user = await getOneUserService(id);

    if (!user) {
      throw new ErrorHandler(404, "User not found");
    }

    //Update the user
    const updatedUser = await updateUserService(id, username, email);

    //Return the user
    handleSuccess(res, updatedUser, 200, "User updated successfully");
  } catch (error) {
    handleError(res, new ErrorHandler(500, error.message));
  }
};

//DELETE user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    //Check if the user exists
    const user = await getOneUserService(id);

    if (!user) {
      throw new ErrorHandler(404, "User not found");
    }

    //Delete the user
    await deleteUserService(id);

    //Return success message
    handleSuccess(res, null, 200, "User deleted successfully");
  } catch (error) {
    handleError(res, new ErrorHandler(500, error.message));
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
};
