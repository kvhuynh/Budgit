export {};

const { google } = require("googleapis");
const { GoogleAuth } = require("google-auth-library");
const { Base64 } = require("js-base64");

const fetch = require("node-fetch");

const secret = process.env.FIRST_SECRET_KEY;

import { User } from "../models/user.model";

import { ThirdPartyAuth } from "../models/thirdPartyAuth";

const jwt = require("jsonwebtoken");

const oAuth2Client = new google.auth.OAuth2(
	process.env.GOOGLE_CLIENT_ID,
	process.env.GOOGLE_CLIENT_SECRET,
	process.env.GOOGLE_REDIRECT_URL
);

const { getSessionId } = require("../utilities/getSessionId.utilities");

const auth = new GoogleAuth();

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

const exchangeToken = async (code: string, res: any): Promise<oAuthData> => {
	try {
		const { tokens } = await oAuth2Client.getToken(code);
		oAuth2Client.setCredentials(tokens);

		const data = await retrieveUserInformation(tokens.access_token);
		// console.log(tokens);

		// console.log(data);
		return {
			userData: data,
			refreshToken: tokens.refresh_token,
		};

		/* idToken = 
                    {  
                       "iss":"https://accounts.google.com",
                       "at_hash":"xxx",
                       "aud":"xxx.apps.googleusercontent.com",
                       "sub":"xxx",
                       "email_verified":true,
                       "azp":"xxx.apps.googleusercontent.com",
                       "email":"xxx@gmail.com",
                       "iat":xxx,
                       "exp":xxx
                    } */

		const idToken = await decodeToken(tokens.id_token);
	} catch (error) {
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
	let values = idToken.split(".");
	return JSON.parse(Base64.decode(values[bodyIndex])).sub;
};

// TODO: merge create user into one method from the user.service
// saves refresh token
const createUser = async (oAuthData: oAuthData, res: any) => {
	const { given_name, family_name, email } = oAuthData.userData;

	const isNewUser = await User.findOne({ where: { email: email } });

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
				console.log(userToken);
				
				
				// return res.status(201).send(userToken);
				
				return { isSuccess: true, accessToken: userToken };
	
				// res
				// 	.cookie("userToken", userToken, secret, {
				// 		httpOnly: true,
				// 		sameSite: "none",
				// 		// secure: "false"
				// 	})
				// 	.json({ msg: "success!" });
	
			})
			.catch((error: any) => {
	
				return error;
			});
			
			// return { isSuccess: true };
			return user;

	} else {
		const userToken = jwt.sign(
			{
				id: isNewUser.id,
			},
			process.env.SECRET_KEY
		);
		console.log(userToken);
		
		
		// return res.status(201).send(userToken);
		
		return { isSuccess: true, accessToken: userToken };
	}
	


};

const loginUser = () => {

}

module.exports = {
	exchangeToken,
	decodeToken,
	createUser,
};
