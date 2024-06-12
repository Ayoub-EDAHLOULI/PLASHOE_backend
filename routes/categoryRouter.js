const express = require("express");
const router = express.Router();

const { getAllCategories } = require("../api/categoryApi");

router.get("/categories", getAllCategories);

module.exports = router;
