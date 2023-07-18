import { Request, Response } from "express";

const {
	getAllIncomeSources,
	getAllTransactions,
} = require("../services/incomeSource.service");

const handleGetAllIncomeSources = async (req: Request, res: Response) => {
	try {        
		const incomeSources = await getAllIncomeSources(req.cookies.token);

		return res.json(incomeSources);
	} catch (error: any) {
		return res.status(400).json(error);
	}
};

const handleGetAllTransactions = async (req: Request, res: Response) => {
	try {
		console.log("retrieving transactions...");

		const transactions = await getAllTransactions(req.cookies.usertoken);
		console.log("transactions recieved...")
		return res.json(transactions);
	} catch (error: any) {
		return res.status(400).json(error);
	}
};

module.exports = {
	handleGetAllIncomeSources,
	handleGetAllTransactions,
};
