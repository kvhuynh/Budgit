export {}

const {
    getAllBudgets,
    getOneBudget,
    createBudget,
    updateBudget,
    deleteBudget
} = require("../services/budget.service")

const handleGetAllBudgets = async (req: any, res: any) => {
    try {
        const budget = await getAllBudgets(req.cookies.usertoken);
        return res.json(budget);
    } catch (error: any) {
        return res.status(400).json(error);
    }
}

const handleGetOneBudget = async (req: any, res: any) => {
    try {    
        const budget = await getOneBudget(req.cookies.usertoken, req.params.id);
        return res.json(budget)
    } catch (error:any) {
        return res.status(400).json(error);
    }
}

const handleCreateBudget = async (req: any, res: any) => {
    try {
        const budget = await createBudget(req.cookies.usertoken, req.body)
        return res.json(budget);
    } catch (error: any) {
        return res.status(400).json(error);
    }
}

const handleUpdateBudget = async (req: any, res: any) => {
    try {
        const budget = await updateBudget(req.cookies.usertoken, req.params.id, req.body);
        return res.json(budget);
    } catch (error: any) {
        return res.status(400).json(error);
    }
}

const handleDeleteBudget = async (req: any, res: any) => {
    try {
        const budget = await deleteBudget(req.cookies.usertoken, req.params.id);
        return res.json(budget);
    } catch (error: any){
        return res.status(400).json(error);
    }
}

module.exports = {
    handleGetAllBudgets,
    handleGetOneBudget,
    handleCreateBudget,
    handleUpdateBudget,
    handleDeleteBudget
};



