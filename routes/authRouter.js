const express = require("express");
const router = express.Router();
const { register } = require("../api/Auth/authApi");

router.post("/register", register);

module.exports = router;
