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
const PLAID_CLIENT_ID: string | undefined = process.env.PLAID_CLIENT_ID;
const PLAID_SECRET: string | undefined = process.env.PLAID_SECRET;
const PLAID_ENV: string | undefined = process.env.PLAID_ENV || "sandbox";

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
const setAccessToken = async (publicToken: string, userId: string) => {
	const tokenResponse = await client.itemPublicTokenExchange({
		public_token: publicToken,
	});

	const institutionData = await retrieveInstitution(
		tokenResponse.data.access_token
	);

	const data: {[k : string]: string} = {
		accessToken: tokenResponse.data.access_token,
		itemId: tokenResponse.data.item_id,
		userId: getSessionId(userId),
		institutionName: institutionData.name,
		institutionLogo: institutionData.logo,
		institutionUrl: institutionData.url,
	};

	await IncomeSource.create(data);

	const bankInformation = await retrieveBankInformation([
		{ accessToken: data.accessToken },
	]);

	return bankInformation;
};

// Helper method to grab institution name and icon from plaid
const retrieveInstitution = async (accessToken: any) => {
	const item = await client.itemGet({ access_token: accessToken });

	const institutionResponse = await client.institutionsGetById({
		institution_id: item.data.item.institution_id,
		country_codes: ["US"],
		options: {
			include_optional_metadata: true,
		},
	});

	return institutionResponse.data.institution;
};

// called from incomeService.ts to retrieve account info via access token
const retrieveBankInformation = async (accessTokens: any) => {
	let bankList = [];

	try {
		for (let i = 0; i < accessTokens.length; i++) {
			const bankAccount = await client.accountsBalanceGet({
				access_token: accessTokens[i].accessToken,
			});

			bankList.push(bankAccount.data.accounts);
		}
		return bankList;
	} catch (error: any) {
		console.log(error);
	}
};

const retrieveTransactions = async (accessTokens: any) => {
	let transactionList: Object[] = [];

	try {
		for (let i = 0; i < accessTokens.length; i++) {
			const transactionResults = await client.transactionsSync({
				access_token: accessTokens[i].accessToken,
			});
			transactionList.push(transactionResults.data.added);
		}

		return transactionList;
	} catch (error: any) {
		console.log(error);
	}
};

module.exports = {
	createLinkToken,
	setAccessToken,
	retrieveBankInformation,
	retrieveInstitution,
	retrieveTransactions,
};
