const express = require("express");
const router = express.Router();
const { getAllUsers, getOneUser, createUser } = require("../api/userApi");

router.get("/users", getAllUsers);
router.get("/user/:id", getOneUser);
router.post("/user", createUser);

module.exports = router;
