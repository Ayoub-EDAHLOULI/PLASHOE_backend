const express = require("express");
const router = express.Router();

const { getAllAdresses } = require("../api/addressApi");

router.get("/adresses", getAllAdresses);

module.exports = router;
