export {};

import { User } from "../models/user.model";
import { IncomeSource } from "../models/incomeSource.model";

const { getSessionId } = require("../utilities/getSessionId.utilities");

const {
	Configuration,
	PlaidApi,
	Products,
	PlaidEnvironments,
} = require("plaid");

// const APP_PORT = process.env.APP_PORT || 8000;
const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
const PLAID_SECRET = process.env.PLAID_SECRET;
const PLAID_ENV = process.env.PLAID_ENV || "sandbox";

const configuration = new Configuration({
	basePath: PlaidEnvironments[PLAID_ENV],
	baseOptions: {
		headers: {
			"PLAID-CLIENT-ID": PLAID_CLIENT_ID,
			"PLAID-SECRET": PLAID_SECRET,
			"Plaid-Version": "2020-09-14",
		},
	},
});

const client = new PlaidApi(configuration);

const basicLinkTokenObject = {
	user: { client_user_id: "1" },
	client_name: "Budgit",
	link_customization_name: process.env.LINK_CUSTOM_NAME,
	language: "en",
	products: [],
	country_codes: ["US"],
};

const createLinkToken = async () => {
	
	const linkTokenObject = {
		...basicLinkTokenObject,
		products: ["transactions"],
	};
	const tokenResponse = await client.linkTokenCreate(linkTokenObject);
	
	return tokenResponse.data;
};

const setAccessToken = async (publicToken: any, userId: string) => {
	
	const tokenResponse = await client.itemPublicTokenExchange({
		public_token: publicToken.publicToken,
	});

	const data = {
		accessToken: tokenResponse.data.access_token,
		itemId: tokenResponse.data.item_id,
        userId: getSessionId(userId)
	};

	const incomeSource = await IncomeSource.create(data);
	
	const test = await retrieveBankInformation([{accessToken: data.accessToken}])
	console.log(test);
	
	
	return test

};


// called from incomeService.ts to retrieve account info via access token
const retrieveBankInformation = async (x: any) => {
	let arr = []
	// console.log(x.length);
	// console.log(x);
	// console.log(x[0].accessToken);

	
	for (let i = 0; i < x.length; i++) {
		const response = await client.accountsBalanceGet({access_token: x[i].accessToken})	
		arr.push(response.data.accounts)
	}
	return arr
}
module.exports = {
	createLinkToken,
	setAccessToken,
	retrieveBankInformation
};
