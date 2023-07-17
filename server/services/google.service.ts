const { google } = require("googleapis");
const { GoogleAuth } = require("google-auth-library");
const { Base64 } = require("js-base64");
const fetch = require("node-fetch");
const jwt = require("jsonwebtoken");

import { User } from "../models/user.model";
import { ThirdPartyAuth } from "../models/thirdPartyAuth";

const oAuth2Client = new google.auth.OAuth2(
	process.env.GOOGLE_CLIENT_ID,
	process.env.GOOGLE_CLIENT_SECRET,
	process.env.GOOGLE_REDIRECT_URL
);

interface oAuthData {
	userData: userData;
	refreshToken: string;
}

interface userData {
	id?: string;
	email?: string;
	verified_email?: boolean;
	name?: string;
	given_name?: string;
	family_name?: string;
	picture?: string;
	locale?: string;
}

const defaultUserData = {
	id: "",
	email: "",
	verified_email: false,
	name: "",
	given_name: "",
	family_name: "",
	picture: "",
	locale: "",
};

const defaultOAuth = {
	userData: defaultUserData,
	refreshToken: "",
};

const exchangeToken = async (
	code: string
): Promise<{
	userData: userData;
	refreshToken: string;
}> => {
	try {
		const { tokens } = await oAuth2Client.getToken(code);
		oAuth2Client.setCredentials(tokens);

		const data: userData = await retrieveUserInformation(tokens.access_token);
		return {
			userData: data,
			refreshToken: tokens.refresh_token,
		};
	} catch (error: any) {
		return defaultOAuth;
	}
};

const retrieveUserInformation = async (authToken: string): Promise<object> => {
	const url =
		"https://www.googleapis.com/oauth2/v1/userinfo?access_token=" + authToken;
	return await (await fetch(url)).json();
};

const decodeToken = async (idToken: string): Promise<string> => {
	const bodyIndex = 1;
	let values: string[] = idToken.split(".");
	return JSON.parse(Base64.decode(values[bodyIndex])).sub;
};

// TODO: merge create user into one method from the user.service
// saves refresh token
const createUser = async (
	oAuthData: oAuthData
): Promise<{ isSuccess: boolean; accessToken: string }> => {
	const { given_name, family_name, email } = oAuthData.userData;

	const isNewUser: User | null = await User.findOne({
		where: { email: email },
	});

	if (!isNewUser) {
		const userData = {
			firstName: given_name,
			lastName: family_name,
			email: email,
			password: null,
			confirmPassword: null,
			isOAuth: true,
		};

		const user = await User.create(userData)
			.then((user: User) => {
				const createAuth: Promise<ThirdPartyAuth> = ThirdPartyAuth.create({
					refreshToken: oAuthData.refreshToken,
					userId: user.id,
				});

				const userToken = jwt.sign(
					{
						id: user.id,
					},
					process.env.SECRET_KEY
				);

				return { isSuccess: true, accessToken: userToken };
			})
			.catch((error: any) => {
				return error;
			});

		return user;
	} else {
		const userToken = jwt.sign(
			{
				id: isNewUser.id,
			},
			process.env.SECRET_KEY
		);
		return { isSuccess: true, accessToken: userToken };
	}
};

module.exports = {
	exchangeToken,
	decodeToken,
	createUser,
};
