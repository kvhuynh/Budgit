export {}

const express = require("express");
const { authenticate } = require("../config/jwt.config");

const {
    handleRegisterUser,
    handleLoginUser,
    handleGetOneUser,
    handleGetAllUsers,
    handleLogoutUser
} = require("../controllers/user.controller");

const router = express.Router();

router.post("/register", handleRegisterUser);


router.post("/login", handleLoginUser);
router.get("/users", authenticate, handleGetAllUsers); // inorder to access this route user must be authenticated via login or registration
router.get("/logout", handleLogoutUser);
router.get("/:id", handleGetOneUser);

module.exports = { userRouter: router }