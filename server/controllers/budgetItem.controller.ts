import { Request, Response } from "express";

const {
	getAllBudgetItems,
	getOneBudgetItem,
	createBudgetItem,
	updateBudgetItem,
	deleteBudgetItem,
} = require("../services/budgetItem.service");

const handleGetAllBudgetItems = async (req: Request, res: Response) => {
	try {
		console.log(req.params);

		const budgetItems = await getAllBudgetItems(
			req.cookies.usertoken,
			req.params.budgetId
		);
		return res.json(budgetItems);
	} catch (error: any) {
		
		return res.status(400).json(error);
	}
};

const handleGetOneBudgetItem = async (req: Request, res: Response) => {
	
	try {
		const budgetItem = await getOneBudgetItem(req.cookies.usertoken, req.params.id);

		return res.json(budgetItem)
	} catch (error: any) {
		return res.status(400).json(error);
	}
};

const handleCreateBudgetItem = async (req: Request, res: Response) => {
	try {
	
		const budgetItem = await createBudgetItem(req.params.budgetId, req.body);
		return res.json(budgetItem);
	} catch (error: any) {
		return res.status(400).json(error);
	}
};

const handleUpdateBudgetItem = async (req: Request, res: Response) => {
	try {

		const budgetItem = await updateBudgetItem(req.params.id, req.body);
		
		return res.json(budgetItem);
		
	} catch (error: any) {
		
		return res.status(400).json(error);
	}
};

const handleDeleteBudgetItem = async (req: Request, res: Response) => {
	try {

		const budgetItem = await deleteBudgetItem(req.params.budgetId);
		
		return res.json(budgetItem);
	} catch (error: any) {
		return res.status(400).json(error);
	}
};

module.exports = {
	handleGetAllBudgetItems,
	handleGetOneBudgetItem,
	handleCreateBudgetItem,
	handleUpdateBudgetItem,
	handleDeleteBudgetItem,
};
