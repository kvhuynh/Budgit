import axios from "axios";

const http = axios.create({
    baseURL: "http://localhost:8000/api",
    withCredentials: true,
})


// User operations
export const createUser = async (potentialUser: Object) => {    

    const res = await http.post("/users/register", potentialUser)
    return res.data;
}

export const loginUser = async (potentialUser: Object) => {

    const res = await http.post("/users/login", potentialUser); 
    return res.data;
}

export const getCurrentUser = async () => {

    const res = await http.get("/users/")
    return res.data   
}

export const logoutUser = async () => {
    const res = await http.get("/users/logout")
    
    return res.data;
}

export const createBudget = async (budgetData: Object) => {
    
    const res = await http.post("/budgets/new", budgetData)
    return res.data;
}

export const getAllBudgets = async () => {

    const res = await http.get("/budgets/")
    return res.data
}

export const getOneBudget = async (budgetName: string) => {

    const res = await http.get("/budgets/" + budgetName)
    console.log(res.data);
    

    return res.data  
}

export const deleteBudget = async (budgetId: number) => {

    const res = await http.delete(`/budgets/${budgetId}/delete`)
    return res.data 
}

export const createBudgetItem = async (budgetItemData: Object, budgetId: number) => {
    
    const res = await http.post(`/budgetItems/${budgetId}/new`, budgetItemData)
    console.log(res.data);
    

    return res.data;
}

export const getAllBudgetItemsByBudget = async (budgetId: number) => {

    const res = await http.get(`/budgetItems/${budgetId}`)
    console.log(res.data);
    
    return res.data;
}