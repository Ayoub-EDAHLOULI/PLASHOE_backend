const { ErrorHandler, handleError } = require("../../utils/errorHandler");
const { handleSuccess } = require("../../utils/successHandler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//User Services
const {
  createUserService,
  checkEmail,
} = require("../../services/userServices");

//Register a new user
const register = async (req, res) => {
  try {
    //Get the user data from the request body
    const { username, email, password } = req.body;

    //Make the email lowercase
    const lowerCaseEmail = email.toLowerCase();

    //Check if name, email and password are provided
    if (!username || !email || !password) {
      throw new ErrorHandler(
        400,
        "Please provide username, email and password"
      );
    }

    //Check if email is valid
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      throw new ErrorHandler(400, "Please provide a valid email");
    }

    //Check if the password is at least 6 characters long
    if (password.length < 6) {
      throw new ErrorHandler(
        400,
        "Password must be at least 6 characters long"
      );
    }

    //Check if the user already exists
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

//Login a user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Make the email lowercase
    const lowerCaseEmail = email.toLowerCase();

    //Check if email and password are provided
    if (!email || !password) {
      throw new ErrorHandler(400, "Please provide email and password");
    }

    //Check if the user exists
    const user = await checkEmail(lowerCaseEmail);

    if (!user) {
      throw new ErrorHandler(400, "Invalid credentials");
    }

    //Check if the password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new ErrorHandler(400, "Invalid credentials");
    }

    //Create a token
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRE,
      }
    );

    //Return the user
    handleSuccess(res, { token }, 200, "Login successful");
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = { register, login };
