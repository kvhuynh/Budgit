import { Request, Response } from "express";

const {
	createUser,
	loginUser,
	getOneUser,
	getCurrentUser,
	logoutUser,
} = require("../services/user.service");

const handleRegisterUser = async (req: Request, res: Response) => {
	try {
		const user = await createUser(req.body, res);

		return res.json(user);
	} catch (error: any) {
		return res.status(400).json(error);
	}
};

const handleLoginUser = async (req: Request, res: Response) => {
	try {
		const user = await loginUser(req.body, res);

		return res.json(user);
	} catch (error: any) {
		console.log(error);

		return res.status(400).json(error);
	}
};

const handleGetCurrentUser = async (req: Request, res: Response) => {
	try {
		const user = await getCurrentUser(req.cookies.token);

		return res.json(user);
	} catch (error: any) {
		console.log(error);

		return res.status(400).json(error);
	}
};

const handleGetOneUser = async (req: Request, res: Response) => {
	try {
		const user = await getOneUser(req.params.id);
		return res.json(user);
	} catch (error: any) {
		return res.status(400).json(error);
	}
};

const handleLogoutUser = async (req: Request, res: Response) => {
	try {
		const user = await logoutUser(res);
		// return res.json(user);
	} catch (error: any) {
		console.log(error);
	}
};

module.exports = {
	handleRegisterUser,
	handleLoginUser,
	handleGetCurrentUser,
	handleGetOneUser,
	handleLogoutUser,
};
