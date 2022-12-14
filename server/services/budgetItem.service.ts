import { BudgetItem } from "../models/budgetItem.model";
import { Budget } from "../models/budget.model";

const { getSessionId } = require("../utilities/getSessionId.utilities");

const getAllBudgetItems = async (userId: string, budgetId: number) => {	
	// get sum of all budgetItems and update the budget they are associated with

    const sessionId = getSessionId(userId);
	
	let sum = 0;
	
	const budget = await Budget.findOne({ where: { id: budgetId } })	
	
	const budgetItems = await BudgetItem.findAll({
		where: { budget_id: budgetId },
	});
	
	
	for (let i = 0; i < budgetItems.length; i++) {
		sum += budgetItems[i].dataValues.balance;
	}

	return {budgetItems: budgetItems, sum: sum};
};

const getOneBudgetItem = async (budgetId: string) => {
	const budgetItem = await BudgetItem.findOne({
		where: { budget_id: budgetId },
	});
	return budgetItem;
};

const createBudgetItem = async (budgetId: string, data: any) => {
	const dateTime = new Date();
	data["budgetId"] = budgetId;
	data["balance"] = data["totalBalance"] 

	if (data["balance"] !== 0) {
		data["history"] = []
		data["history"].push([(dateTime.toISOString().slice(0,10)), data["balance"]])
		data["history"] = JSON.stringify(data["history"])
	}
	
	const budgetItem = await BudgetItem.create(data);

	
	return budgetItem;
};

const updateBudgetItem = async (id: number, data: any) => {

	const currentItem = await BudgetItem.findOne({ where:{ id: data.budgetItemId } })
	
	if (currentItem?.dataValues.history !== "") {
		
		const dateTime = new Date();
		var newHistory = JSON.parse(currentItem?.dataValues.history)
		let addingHistory = [(dateTime.toISOString().slice(0,10)), data.amount]

		newHistory.push(addingHistory)
		
	} else {
		console.log("no");
		
	}
	
	const updatedBudgetItem = await BudgetItem.increment({ balance: data.amount }, { where:{ id: data.budgetItemId } })
		.then(() => {
			// console.log(history);
			
			// BudgetItem.update({ history: '[["2022-12-13","1"]]' }, { where: { id: data.budgetItemId }, individualHooks: true })
			BudgetItem.update({ history: JSON.stringify(newHistory) }, { where: { id: data.budgetItemId }, individualHooks: true })
		})


	return updatedBudgetItem;
	// const budget = await Budget.update({ total_balance: data.newTotalBalance }, { where: { user_id: sessionId, name: budgetName } });
};

const deleteBudgetItem = async (budgetId: number) => {
	const deletedBudgetItem = await BudgetItem.destroy({ where: { id: budgetId  } })
	return deletedBudgetItem;
};

module.exports = {
	getAllBudgetItems,
	getOneBudgetItem,
	createBudgetItem,
	updateBudgetItem,
	deleteBudgetItem,
};
