import { Budget } from "../models/budget.model";

const { getSessionId } = require("../utilities/getSessionId.utilities")

const getAllBudgets = async (userId: string) => { 

    const sessionId = getSessionId(userId);
    
    const budgets = await Budget.findAll({ where: { user_id: sessionId } })

    let sum = 0;

    for (let i = 0; i < budgets.length; i++) {
        sum += budgets[i].totalBalance;
        
    }
    

    return {budgets: budgets, totalBalance: sum}
    
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

const updateBudget = async (userId: string, budgetName: string, data: any) => {
    console.log("service: updateBudget");
    // const { name } = data;
    console.log(data.newTotalBalance);
    
    const sessionId = getSessionId(userId);

    const budget = await Budget.update({ total_balance: data.newTotalBalance }, { where: { user_id: sessionId, name: budgetName } });

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