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
        const budget = await getAllBudgets(req.body.id);
        return res.json(budget);
    } catch (error: any) {
        return res.status(400).json(error);
    }
}

const handleGetOneBudget = async (req: any, res: any) => {
    try {
        const budget = await getOneBudget(req.body.id);
    } catch (error:any) {
        return res.status(400).json(error);
    }
}

const handleCreateBudget = async (req: any, res: any) => {
    try {
        const budget = await createBudget(req.cookies.usertoken, req.body)
        return budget;
    } catch (error: any) {
        return res.status(400).json(error);
    }
}

const handleUpdateBudget = async (req: any, res: any) => {
    try {
        const budget = await updateBudget(req.body);
    } catch (error: any) {
        return res.status(400).json(error);
    }
}

const handleDeleteBudget = async (req: any, res: any) => {
    try {
        const budget = await deleteBudget(req.body.id);
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



