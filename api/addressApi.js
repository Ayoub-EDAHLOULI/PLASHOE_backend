const { ErrorHandler, handleError } = require("../utils/errorHandler");
const { handleSuccess } = require("../utils/successHandler");

//Adresse Services
const { getAllAddressesService } = require("../services/addressServices");

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

module.exports = { getAllAdresses };
