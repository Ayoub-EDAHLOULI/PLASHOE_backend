//User Services
const prisma = require("../server");

const { ErrorHandler } = require("../utils/errorHandler");

//GET all adresses
const getAllAddressesService = async () => {
  try {
    const addresses = await prisma.address.findMany();

    //Return the adresses
    return addresses;
  } catch (error) {
    throw new ErrorHandler(500, error.message);
  }
};

module.exports = { getAllAddressesService };
