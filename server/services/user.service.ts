import { User } from "../models/user.model";
const { getSessionId } = require("../utilities/getSessionId.utilities");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createUser = async (request: any, res: any): Promise<User> => {
	const user: User = await User.create(request)
		.then((user: User) => {
			const userToken: string = jwt.sign(
				{
					id: user.id,
				},
				process.env.SECRET_KEY
			);

			return { isSuccess: true, accessToken: userToken };
		})
		.catch((err: any) => {
			return err;
		});
	return user;
};

const loginUser = async (data: {
	email: string;
	password: string;
}): Promise<{ accessToken: string }> => {
	const user: User | null = await User.findOne({
		where: { email: data.email },
	});

	if (user === null) {
		throw { name: "UserNotFoundError", message: "incorrect credentials" };
	}

	const correctPassword: boolean = await bcrypt.compare(
		data.password,
		user.password
	);

	if (!correctPassword) {
		throw {
			name: "PasswordIsIncorrectError",
			message: "incorrect credentials",
		};
	}

	const userToken: string = jwt.sign(
		{
			id: user.id,
		},
		process.env.SECRET_KEY
	);

	return { accessToken: userToken };
};

const getCurrentUser = async (
	token: string
): Promise<{
	id: number;
	firstName: string;
	lastName: string;
	email: string;
}> => {
	const user: User | null = await User.findOne({
		where: { id: getSessionId(token) },
	});

	return {
		id: user?.id!,
		firstName: user?.firstName!,
		lastName: user?.lastName!,
		email: user?.email!,
	};
};

const getOneUser = async (id: number): Promise<User | null> => {
	const user: User | null = await User.findOne({ where: { id: id } });

	return user;
};

module.exports = {
	createUser,
	loginUser,
	getCurrentUser,
	getOneUser,
};
