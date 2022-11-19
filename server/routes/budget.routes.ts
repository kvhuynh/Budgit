export {}

const express = require("express");
const { authenticate } = require("../config/jwt.config");

const {
    handleGetAllBudgets,
    handleGetOneBudget,
    handleCreateBudget,
    handleUpdateBudget,
    handleDeleteBudget
} = require("../controllers/budget.controller");

const router = express.Router();

router.post("/new", authenticate, handleCreateBudget);

router.post("/update", authenticate, handleUpdateBudget)

router.get("/:id", authenticate,handleGetOneBudget)

router.get("/", authenticate, handleGetAllBudgets);

router.delete("/delete", authenticate, handleDeleteBudget);

module.exports = { budgetRouter: router }