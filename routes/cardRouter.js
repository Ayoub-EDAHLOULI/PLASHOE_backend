const express = require("express");
const router = express.Router();

const { createCard, getUserCard } = require("../api/cardApi");

const { isAuthenticated } = require("../middleware/authMiddleware");

//POST create card
router
  .post("/card", isAuthenticated, createCard)
  .get("/card", isAuthenticated, getUserCard);

module.exports = router;
