export {}

const express = require("express");
const { authenticate } = require("../config/jwt.config");

const {
    handleRegisterUser,
    handleLoginUser,
<<<<<<< Updated upstream
    handleGetUser,
    handleGetAllUsers,
=======
    handleGetOneUser,
    handleGetCurrentUser,
>>>>>>> Stashed changes
    handleLogoutUser
} = require("../controllers/user.controller");

const router = express.Router();

router.post("/register", handleRegisterUser);
router.post("/login", handleLoginUser);
<<<<<<< Updated upstream
router.post("/me", handleGetUser);
router.get("/users", authenticate, handleGetAllUsers); // inorder to access this route user must be authenticated via login or registration
=======
router.get("/", handleGetCurrentUser);
>>>>>>> Stashed changes
router.get("/logout", handleLogoutUser);

module.exports = { userRouter: router }