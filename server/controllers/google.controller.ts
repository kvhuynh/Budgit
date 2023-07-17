import { Request, Response } from "express";

const {
    exchangeToken,
    createUser
} = require("../services/google.service")

const handleExchangeToken = async (req: Request, res: any): Promise<string> => {
    try {
        const refreshToken = await exchangeToken(req.body.code);
        
        return res.json(refreshToken);
    } catch (error: any) {
        
        return res.status(400).json(error);
    }
}

const handleCreateUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const user = await createUser(req.body);
        
        return res.json(user);
    }

    catch (error: any) {
        return res.status(400).json(error);
  
    }
}


module.exports = {
    handleExchangeToken,
    handleCreateUser
};



