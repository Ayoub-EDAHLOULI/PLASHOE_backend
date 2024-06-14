const express = require("express");
const router = express.Router();

const {
  getAllUsersInfo,
  createUserInfo,
  getUserInfo,
} = require("../api/userInfoApi");

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
router.post("/userInfo", isAuthenticated, createUserInfo);
router.get("/userInfo", isAuthenticated, getUserInfo);

module.exports = router;
