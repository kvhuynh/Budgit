import { BudgetItem } from "../models/budgetItem.model";
import { Budget } from "../models/budget.model";

const { getSessionId } = require("../utilities/getSessionId.utilities");

const getAllBudgetItems = async (userId: string, budgetId: number) => {	

	// get sum of all budgetItems and update the budget they are associated with
    const sessionId = getSessionId(userId);
	
	let expenseSum = 0;
	let incomeSum = 0;
	
	const budget = await Budget.findOne({ where: { id: budgetId } })	
	
	const budgetItems = await BudgetItem.findAll({
		where: { budget_id: budgetId, type: "expense" },
	});

	const incomeItems = await BudgetItem.findAll({
		where: {
			budget_id: budgetId, type: "income source"
		}
	})
	

	for (let i = 0; i < budgetItems.length; i++) {
		expenseSum += budgetItems[i].dataValues.value;

	}

	for (let j = 0; j < incomeItems.length; j++) {
		incomeSum += incomeItems[j].dataValues.value;
	}
	
	return {budgetItems: budgetItems, incomeItems: incomeItems, expenseSum: expenseSum, incomeSum: incomeSum};
};

const getOneBudgetItem = async (userId: string, budgetItemId: string) => {
	
	const budgetItem = await BudgetItem.findOne({
		where: { id: budgetItemId },
	});
	return budgetItem;
};

const createBudgetItem = async (budgetId: string, data: any) => {
	const dateTime = new Date();
	data["budgetId"] = budgetId;
	data["value"] = data["totalBalance"] 
	
	if (data["value"] !== 0) {
		data["history"] = []
		data["history"].push([(dateTime.toISOString().slice(0,10)), data["value"]])
		data["history"] = JSON.stringify(data["history"])
	}
	
	console.log(data);
	

	const budgetItem = await BudgetItem.create(data);

	console.log("how about here");
	
	
	return budgetItem;
};

const updateBudgetItem = async (id: number, data: any) => {

	const currentItem = await BudgetItem.findOne({ where:{ id: data.budgetItemId } })
	

	if (data.amount === 0) {	
		throw {
			invalidAmounterror: "Please enter a non 0 value"
		}
	}	

	// if a budget item was created but no initial value was given
	if (currentItem?.dataValues.history !== "") {
		
		const dateTime = new Date();
		var newHistory = JSON.parse(currentItem?.dataValues.history)
		let addingHistory = [(dateTime.toISOString().slice(0,10)), data.amount]

		newHistory.push(addingHistory)
		
	} else {
		console.log("no value given");
		
	}
	
	const updatedBudgetItem = await BudgetItem.increment({ value: data.amount }, { where:{ id: data.budgetItemId } })
		.then(() => {

			BudgetItem.update({ history: JSON.stringify(newHistory) }, { where: { id: data.budgetItemId }, individualHooks: true })
		})


	return updatedBudgetItem;
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
