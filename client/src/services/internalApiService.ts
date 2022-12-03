import axios from "axios";

const http = axios.create({
    baseURL: "http://localhost:8000/api",
    withCredentials: true,
})


// User operations
export const createUser = async (potentialUser: Object) => {    
    const res = await http.post("/users/register", potentialUser)
    console.log(res.data);
    
    return res.data;
}

export const loginUser = async (potentialUser: Object) => {
    const res = await http.post("/users/login", potentialUser); 
    console.log(res);
    
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
    console.log(budgetData);
    
    const res = await http.post("/budgets/new", budgetData)

    return res.data;
}

export const getAllBudgets = async () => {
    const res = await http.get("/budgets/")
    console.log(res.data);
    
    return res.data
}

export const getOneBudget = async (budgetName: string) => {
    const res = await http.get("/budgets/" + budgetName)
    console.log(res.data);

    return res.data
    
}