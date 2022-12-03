import { BudgetItem } from "../models/budgetItem.model";
import { Budget } from "../models/budget.model";


const { getSessionId } = require("../utilities/getSessionId.utilities")


const getAllBudgetItems = async (userId: string, budgetId: string) => {
    const sessionId = getSessionId(userId);

    // need to ensure that the user requesting to see all of this budgets budget items is the budget that belongs to that user
    const budget = await Budget.findOne( { where: { user_id: sessionId, id: budgetId} })

    if (budget !== null) {
        const budgetItems = await BudgetItem.findAll({ where: { budget_id: budgetId } });
        return budgetItems;
    } else {
        return "unauthorized access to budget";
    }
}

const getOneBudgetItem = async (budgetId: string) => {

    const budgetItem = await BudgetItem.findOne({ where: { budget_id: budgetId } });
    return budgetItem
}

const createBudgetItem = async (budgetId: string, data: any) => {
    console.log(data);
    
    data["budgetId"] = budgetId;
    console.log("creating budget item");
    console.log(data);
    
    const budgetItem = await BudgetItem.create(data);
    
    return budgetItem;

}

const editBudgetItem = async (id: number, data: any) => {

}

const deleteBudgetItem = async () => {

}

module.exports = {
    getAllBudgetItems,
    getOneBudgetItem,
    createBudgetItem,
    editBudgetItem,
    deleteBudgetItem
}