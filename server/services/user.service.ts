export {};

const secret = process.env.FIRST_SECRET_KEY;

import { User } from "../models/user.model";
const { getSessionId } = require("../utilities/getSessionId.utilities");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createUser = async (data: any, res: any) => {
	const user = await User.create(data)
		.then((user: any) => {
			// TODO user should have a user type
			const userToken = jwt.sign(
				{
					id: user.id, 
				},
				process.env.SECRET_KEY
			);

			res
				.cookie("usertoken", userToken, secret, {
					httpOnly: true,
				})
				.json({ msg: "success!" });
		})
		.catch((err: any) => {
			return err;
		});
	return user;
};

const loginUser = async (data: any, res: any) => {
	const user = await User.findOne({ where: { email: data.email } });

	if (user === null) {
		throw { name: "UserNotFoundError", message: "incorrect credentials" };
	}

	const correctPassword = await bcrypt.compare(data.password, user.password);

	if (!correctPassword) {
		throw {
			name: "PasswordIsIncorrectError",
			message: "incorrect credentials",
		};
	}

	const userToken = jwt.sign(
		{
			id: user.id,
		},
		process.env.SECRET_KEY
	);

	res
		.cookie("usertoken", userToken, secret, {
			httpOnly: true,
			// secure: false
		})
		.json({ msg: "success!" });
};

const logoutUser = async (res: any) => {
	res.clearCookie("usertoken");
	res.sendStatus(200);
};

const getCurrentUser = async (res: any) => {
	// console.log("getCurrentUserBackend");
	// console.log(res);
	
	const id = getSessionId(res.usertoken);
	const user = await User.findOne({ where: { id: id } });
	// console.log(user);
	
	return user;
};

const getOneUser = async (id: number, res: any) => {
	const user = await User.findOne({ where: { id: id } });

	return user;
};

module.exports = {
	createUser,
	loginUser,
	logoutUser,
	getCurrentUser,
	getOneUser,
};
