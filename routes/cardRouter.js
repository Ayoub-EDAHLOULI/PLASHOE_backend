const express = require("express");
const router = express.Router();

const { createCard } = require("../api/cardApi");

const { isAuthenticated } = require("../middleware/authMiddleware");

//POST create card
router.post("/card", isAuthenticated, createCard);

module.exports = router;
