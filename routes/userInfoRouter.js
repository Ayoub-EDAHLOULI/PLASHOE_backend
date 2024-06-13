const express = require("express");
const router = express.Router();

const { getAllUsersInfo } = require("../api/userInfoApi");

const {
  isAuthenticated,
  isAuthorized,
} = require("../middleware/authMiddleware");

router.get(
  "/usersInfo",
  isAuthenticated,
  isAuthorized("ADMIN"),
  getAllUsersInfo
);

module.exports = router;
