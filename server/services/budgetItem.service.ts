import { BudgetItem } from "../models/budgetItem.model";
import { Budget } from "../models/budget.model";

const { getSessionId } = require("../utilities/getSessionId.utilities");

const getAllBudgetItems = async (userId: string, budgetId: number) => {	
	// get sum of all budgetItems and update the budget they are associated with

	let sum = 0;
	
    const sessionId = getSessionId(userId);
	const budgetItems = await BudgetItem.findAll({
		where: { budget_id: budgetId },
	});
	
	
	for (let i = 0; i < budgetItems.length; i++) {
		sum += budgetItems[i].dataValues.balance;
	}
	
	await Budget.update({ totalBalance: sum }, { where: { user_id: sessionId, id: budgetId } })

	return budgetItems;
};

const getOneBudgetItem = async (budgetId: string) => {
	const budgetItem = await BudgetItem.findOne({
		where: { budget_id: budgetId },
	});
	return budgetItem;
};

const createBudgetItem = async (budgetId: string, data: any) => {
	data["budgetId"] = budgetId;
	const budgetItem = await BudgetItem.create(data);
	console.log(budgetItem);
	
	return budgetItem;
};

const editBudgetItem = async (id: number, data: any) => {

};

const deleteBudgetItem = async () => {};

module.exports = {
	getAllBudgetItems,
	getOneBudgetItem,
	createBudgetItem,
	editBudgetItem,
	deleteBudgetItem,
};
