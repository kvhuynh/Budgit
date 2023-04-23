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
// const PLAID_ENV = process.env.PLAID_ENV || "sandbox";
const PLAID_ENV = process.env.PLAID_ENV || "development";

// const PLAID_ENV = process.env.PLAID_ENV;

console.log(PLAID_ENV);


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


// Called from 
const setAccessToken = async (publicToken: any, userId: string) => {
	
	const tokenResponse = await client.itemPublicTokenExchange({
		public_token: publicToken.publicToken,
	});

	// retrieveInstitution(tokenResponse.data.access_token)

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

// Helper method to grab institution name and icon from plaid
const retrieveInstitution = async (accessToken: any) => {
	// console.log(accessToken);
	
	const item = await client.itemGet({access_token: accessToken});
	console.log(item.data.item.institution_id);
	

	const institutionResponse = await client.institutionsGetById({institution_id: item.data.item.institution_id, country_codes: ["US"], options: {
		include_optional_metadata: true
	} 
	});

	

	console.log(institutionResponse.data.institution.logo);
	console.log(institutionResponse.data.institution.name);

	
	
}


// called from incomeService.ts to retrieve account info via access token
const retrieveBankInformation = async (x: any) => {
	let bankList = []
	
	try {

		for (let i = 0; i < x.length; i++) {
			const bankAccount = await client.accountsBalanceGet({access_token: x[i].accessToken})	
			// console.log(retrieveInstitution(x[i].accessToken));
			
			bankList.push(bankAccount.data.accounts)
		}
		return bankList
	} catch (error: any) {
		console.log(error);
		
	}
	
}

const retrieveTransactions = async (accessTokens: any) => {
	
	let transactionList: Object[] = [];

	try {
		for (let i = 0; i < accessTokens.length; i++) {
			const transactionResults = await client.transactionsSync({access_token: accessTokens[i].accessToken})
			transactionList.push(transactionResults.data.added)
			
		}

		return transactionList
	} catch (error: any) {
		console.log(error);
		
	}
	
}

module.exports = {
	createLinkToken,
	setAccessToken,
	retrieveBankInformation,
	retrieveInstitution,
	retrieveTransactions
};
