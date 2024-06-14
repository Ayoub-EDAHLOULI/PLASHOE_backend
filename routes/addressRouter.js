const express = require("express");
const router = express.Router();

const { getAllAdresses, createAddress } = require("../api/addressApi");

const { isAuthenticated } = require("../middleware/authMiddleware");

router.get("/addresses", getAllAdresses);
router.post("/address", isAuthenticated, createAddress);

module.exports = router;
