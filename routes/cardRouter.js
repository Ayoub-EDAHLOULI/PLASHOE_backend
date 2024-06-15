const express = require("express");
const router = express.Router();

const { createCard, getUserCard, updateCard } = require("../api/cardApi");

const { isAuthenticated } = require("../middleware/authMiddleware");

//POST create card
router
  .post("/card", isAuthenticated, createCard)
  .get("/card", isAuthenticated, getUserCard);
router.put("/card/:id", isAuthenticated, updateCard);

module.exports = router;
