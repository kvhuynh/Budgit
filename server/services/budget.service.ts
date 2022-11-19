export {};


import jwtDecode from "jwt-decode";
import { Budget } from "../models/budget.model";

interface SessionToken {
    id: number;
    iat: number;
    // whatever else is in the JWT.
  }

const secret = process.env.FIRST_SECRET_KEY;

// for a specific user
const getAllBudgets = async (userId: string) => {
    const id = jwtDecode<SessionToken> (userId);
    
    const sessionId = id.id;

    const budgets = await Budget.findAll({ where: { user_id: sessionId } })
}

const getOneBudget = async () => {

}

const createBudget = async (userId: string, data: any) => {
    const { name } = data;
    const id = jwtDecode<SessionToken> (userId);
    
    const sessionId = id.id;

    data["userId"] = sessionId;

    console.log("service: creating budget with name: " + name);
    const budget = await Budget.create(data);
    return budget
    
}

const updateBudget = async () => {

}

const deleteBudget = async (id: number) => {

}




module.exports = {
    getAllBudgets,
    getOneBudget,
    createBudget,
    updateBudget,
    deleteBudget
}