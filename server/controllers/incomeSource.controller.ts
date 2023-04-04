export {}

const {
    getAllIncomeSources,
    retrieveTransactions
} = require("../services/incomeSource.service")

const handleGetAllIncomeSources = async (req: any, res: any) => {
    try {
        console.log("yes");
        
        const incomeSources = await getAllIncomeSources(req.cookies.usertoken);
        
        return res.json(incomeSources);
    } catch (error: any) {
        console.log("error here?");
        
        return res.status(400).json(error);
    }
}

const handleRetrieveTransactions = async (req: any, res: any) => {
    try {
        console.log("retrieving transactions...");
        const transactions = await retrieveTransactions(req.cookies.usertoken);
        return 
        
    } catch (error: any) {
        return res.status(400).json(error);
    }
}


module.exports = {
    handleGetAllIncomeSources,
    handleRetrieveTransactions
};



