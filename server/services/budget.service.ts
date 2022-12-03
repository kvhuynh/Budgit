import { Budget } from "../models/budget.model";

const { getSessionId } = require("../utilities/getSessionId.utilities")

const getAllBudgets = async (userId: string) => { 

    const sessionId = getSessionId(userId);
    
    const budgets = await Budget.findAll({ where: { user_id: sessionId } })

    return budgets
    
}

// const getOneBudget = async (userId: string, budgetId: string) => {
//     const sessionId = getSessionId(userId);

//     const budget = await Budget.findOne({ where: { user_id: sessionId, id: budgetId } });
//     return budget;
// }

const getOneBudget = async (userId: string, name: string) => {
    const sessionId = getSessionId(userId);

    const budget = await Budget.findOne({ where: { user_id: sessionId, name: name } });
    return budget;
}

const createBudget = async (userId: string, data: any) => {
    const sessionId = getSessionId(userId);

    data["userId"] = sessionId;

    console.log("service: creating budget");
    const budget = await Budget.create(data);
    return budget;
    
}

const updateBudget = async (userId: string, budgetId: string, data: any) => {
    console.log("service: updateBudget");
    const { name } = data;
    console.log(name);
    
    const sessionId = getSessionId(userId);

    const budget = await Budget.update({ name: name }, { where: { user_id: sessionId, id: budgetId } });

    return budget;
    
}

const deleteBudget = async (userId: string, budgetId: string) => {
    console.log(`service: deleting budget ${budgetId}`);
    const sessionId = getSessionId(userId);



    const budget = await Budget.destroy({ where: { user_id: sessionId, id: budgetId } });

    return budget;
}

module.exports = {
    getAllBudgets,
    getOneBudget,
    createBudget,
    updateBudget,
    deleteBudget
}