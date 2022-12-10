const {
	getAllBudgetItems,
	getOneBudgetItem,
	createBudgetItem,
	editBudgetItem,
	deleteBudgetItem,
} = require("../services/budgetItem.service");

const handleGetAllBudgetItems = async (req: any, res: any) => {
	try {
		const budgetItems = await getAllBudgetItems(
			req.cookies.usertoken,
			req.params.budgetId
		);
		return res.json(budgetItems);
	} catch (error: any) {
		return res.status(400).json(error);
	}
};

const handleGetOneBudgetItem = async (req: any, res: any) => {
	try {
	} catch (error: any) {
		return res.status(400).json(error);
	}
};

const handleCreateBudgetItem = async (req: any, res: any) => {
	try {
		console.log(req.body);

		const budgetItem = await createBudgetItem(req.params.budgetId, req.body);
		return res.json(budgetItem);
	} catch (error: any) {
		return res.status(400).json(error);
	}
};

const handleUpdateBudgetItem = async (req: any, res: any) => {
	try {
	} catch (error: any) {}
};

const handleDeleteBudgetItem = async (req: any, res: any) => {
	try {
		const budgetItem = await deleteBudgetItem(req.params.budgetId);
		console.log(budgetItem);
		
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
