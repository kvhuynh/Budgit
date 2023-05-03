export {};

const express = require("express");
const { authenticate } = require("../config/jwt.config");

const {
    handleGetAllIncomeSources,
    handleRetrieveTransactions
} = require("../controllers/incomeSource.controller");

const router = express.Router();

router.get("/", authenticate, handleGetAllIncomeSources);
router.get("/transactions", authenticate, handleRetrieveTransactions);

module.exports = { incomeSourceRouter: router };
