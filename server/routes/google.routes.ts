export {}

const express = require("express")

const {
    handleExchangeToken
} = require("../controllers/google.controller")


const router = express.Router();

router.post("/exchangeToken", handleExchangeToken)

module.exports = { googleRouter: router }