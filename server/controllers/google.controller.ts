export {}

const {
    exchangeToken
} = require("../services/google.service")

const handleExchangeToken = async (req: any, res: any) => {
    try {
        const accessToken = await exchangeToken(req.body.code);
        
        // return res.json(accessToken);
    } catch (error: any) {
        
        return res.status(400).json(error);
    }
}




module.exports = {
    handleExchangeToken
};



