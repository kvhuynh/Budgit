export {}

const express = require("express");
const { authenticate } = require("../config/jwt.config");

const {
    handleRegisterUser,
    handleLoginUser,
    handleGetOneUser,
    handleGetCurrentUser,
    handleLogoutUser
} = require("../controllers/user.controller");

const router = express.Router();

router.post("/register", handleRegisterUser);
router.post("/login", handleLoginUser);
router.get("/", handleGetCurrentUser);

router.get("/logout", handleLogoutUser);

module.exports = { userRouter: router }