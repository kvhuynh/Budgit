const {
    getAllBudgetItems,
    getOneBudgetItem,
    createBudgetItem,
    editBudgetItem,
    deleteBudgetItem
} = require("../services/budgetItem.service")


const handleGetAllBudgetItems = async (req: any, res: any) => {
    try {
        console.log(req.params.budgetId);
        
        const budgetItems = await getAllBudgetItems(req.cookies.usertoken, req.params.budgetId);
        
        return res.json(budgetItems);
    } catch (error: any) {

    }
}

const handleGetOneBudgetItem = async (req: any, res: any) => {
    try {

    } catch (error: any) {
        
    }
}

const handleCreateBudgetItem = async (req: any, res: any) => {
    try {
        console.log("hello");
        console.log(req.params.budgetId);
        
        const budgetItem = await createBudgetItem(req.params.budgetId, req.body);
        return res.json(budgetItem);
    } catch (error: any) {
        return res.status(400).json(error);
    }
}

const handleEditBudgetItem = async (req: any, res: any) => {
    try {

    } catch (error: any) {
        
    }
}

const handleUpdateBudgetItem = async (req: any, res: any) => {
    try {

    } catch (error: any) {

    }
}

const handleDeleteBudgetItem = async (req: any, res: any) => {
    try {

    } catch (error: any) {
        
    }
}

module.exports = {
    handleGetAllBudgetItems,
    handleGetOneBudgetItem,
    handleCreateBudgetItem,
    handleUpdateBudgetItem,
    handleDeleteBudgetItem
};
