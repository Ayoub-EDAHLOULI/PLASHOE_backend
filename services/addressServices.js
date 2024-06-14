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

//POST create user address
const createAddressService = async (
  userId,
  streetName,
  appartName,
  city,
  state,
  zip
) => {
  try {
    const address = await prisma.address.create({
      data: {
        streetName,
        appartName,
        city,
        state,
        zip,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    //Return the address
    return address;
  } catch (error) {
    throw new ErrorHandler(500, error.message);
  }
};

module.exports = {
  getAllAddressesService,
  createAddressService,
};
