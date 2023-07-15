export {};

const express = require("express");

const { handleExchangeToken, handleCreateUser } = require("../controllers/google.controller");

const router = express.Router();

router.post("/exchangeToken", handleExchangeToken);
router.post("/createUser", handleCreateUser);

module.exports = { googleRouter: router };
