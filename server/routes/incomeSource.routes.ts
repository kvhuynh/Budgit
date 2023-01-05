export {};

const express = require("express");
const { authenticate } = require("../config/jwt.config");

const {
    handleGetAllIncomeSources
} = require("../controllers/incomeSource.controller");

const router = express.Router();

router.get("/", authenticate, handleGetAllIncomeSources);

module.exports = { incomeSourceRouter: router };
