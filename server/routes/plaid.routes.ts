export {}

const express = require("express")

const {
    handleCreateLinkToken,
    handleSetAccessToken
} = require("../controllers/plaid.controller")


const router = express.Router();

router.post("/info")

router.post("/createLinkToken", handleCreateLinkToken)

router.post("/createLinkTokenForPayment")

router.post("/setAccessToken", handleSetAccessToken)

router.get("/auth")

router.get("/transactions")

router.get("/investmentsTransactions")

router.get("/identity")

router.get("/balance")

router.get("/holdings")

router.get("/liabilities")

router.get("/item")

router.get("/accounts")

router.get("/assets")

router.get("/transfer")

router.get("/payment")

module.exports = { plaidRouter: router }