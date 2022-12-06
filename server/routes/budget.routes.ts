export {};

const express = require("express");
const { authenticate } = require("../config/jwt.config");

const {
	handleGetAllBudgets,
	handleGetOneBudget,
	handleCreateBudget,
	handleUpdateBudget,
	handleDeleteBudget,
} = require("../controllers/budget.controller");

const router = express.Router();

router.post("/new", authenticate, handleCreateBudget);

router.put("/:id/update", authenticate, handleUpdateBudget);

router.get("/", handleGetAllBudgets);

// router.get("/:id", authenticate,handleGetOneBudget)

router.get("/:name", authenticate, handleGetOneBudget);

router.delete("/:id/delete", authenticate, handleDeleteBudget);

module.exports = { budgetRouter: router };
