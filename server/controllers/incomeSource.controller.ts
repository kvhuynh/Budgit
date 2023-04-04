export {}

const {
    getAllIncomeSources
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



module.exports = {
    handleGetAllIncomeSources
};



