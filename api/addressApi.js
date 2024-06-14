const { ErrorHandler, handleError } = require("../utils/errorHandler");
const { handleSuccess } = require("../utils/successHandler");

//Adresse Services
const {
  getAllAddressesService,
  createAddressService,
} = require("../services/addressServices");

//GET all adresses
const getAllAdresses = async (req, res) => {
  try {
    const addresses = await getAllAddressesService();

    //Check if there are no adresses
    if (!addresses.data) {
      throw new ErrorHandler(404, "No adresses found");
    }

    //Return the adresses
    handleSuccess(res, addresses);
  } catch (error) {
    handleError(res, new ErrorHandler(500, error.message));
  }
};

//POST create user address
const createAddress = async (req, res) => {
  try {
    //Get the user id
    const userId = req.user.id;

    //Get the address data from the request body
    let { streetName, appartName, city, state, zip } = req.body;

    //Check if all the fields are filled
    if (!streetName && !city && !state && !zip && !appartName) {
      throw new ErrorHandler(400, "All fields are required");
    }

    //Check if the information is not empty and if it empty transform it to null
    streetName = streetName ? streetName : null;
    appartName = appartName ? appartName : null;
    city = city ? city : null;
    state = state ? state : null;
    zip = zip ? zip : null;

    //Create the address
    const address = await createAddressService(
      userId,
      streetName,
      appartName,
      city,
      state,
      zip
    );

    //Return the address
    handleSuccess(res, address);
  } catch (error) {
    handleError(res, new ErrorHandler(500, error.message));
  }
};

module.exports = { getAllAdresses, createAddress };
