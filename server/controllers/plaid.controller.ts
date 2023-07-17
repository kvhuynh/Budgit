import { Request, Response } from "express";

const {
	createLinkToken,
	setAccessToken,
} = require("../services/plaid.service");

const handleGetInfo = async (req: Request, res: Response) => {
	try {
	} catch (error: any) {
		return res.status(400).json(error);
	}
};

const handleCreateLinkToken = async (req: Request, res: Response) => {
	try {
		const linkToken = await createLinkToken();

		return res.json(linkToken);
	} catch (error: any) {
		console.log(error);

		return res.status(400).json(error);
	}
};

const handleSetAccessToken = async (req: Request, res: Response) => {
	try {
		const accessToken = await setAccessToken(
			req.body.publicToken,
			req.cookies.token
		);

		return res.json(accessToken);
	} catch (error: any) {
		console.log(error);
	}
};

module.exports = {
	handleCreateLinkToken,
	handleSetAccessToken,
};
