export {}

const express = require("express");
const { authenticate } = require("../config/jwt.config");

const {
    handleGetAllBudgetItems,
    handleGetOneBudgetItem,
    handleCreateBudgetItem,
    handleUpdateBudgetItem,
    handleDeleteBudgetItem
} = require("../controllers/budgetItem.controller")

const router = express.Router();

router.post("/:budgetId/new", authenticate, handleCreateBudgetItem);

router.put("/:id/update", authenticate, handleUpdateBudgetItem)

router.get("/:budgetId", handleGetAllBudgetItems);

router.get("/:id", authenticate, handleGetOneBudgetItem)

router.delete("/:id/delete", authenticate, handleDeleteBudgetItem);

module.exports = { budgetItemRouter: router }