export {};

import { User } from "../models/user.model";
import { IncomeSource } from "../models/incomeSource.model";

const {
	retrieveBankInformation,
	retrieveTransactions,
	retrieveInstitution
} = require("./plaid.service");

const { getSessionId } = require("../utilities/getSessionId.utilities");

const getAllIncomeSources = async (userToken: string) => {
	const userSession = getSessionId(userToken);

	const accessIncomeSources = await IncomeSource.findAll({
		where: { user_id: userSession },
	});

	const incomeSources = await retrieveBankInformation(accessIncomeSources);

	let total = 0;
	for (let i = 0; i < incomeSources.length; i++) {

		for (let j = 0; j < incomeSources[i].length; j++) {
			total += incomeSources[i][j].balances.current;
            console.log(incomeSources[i][j]);
            
		}
		console.log("*************");
	}

	return { incomeSources: incomeSources, total: total };

};

const getTransactions = async (userToken: string) => {
	const userSession = getSessionId(userToken);

	const accessIncomeSources = await IncomeSource.findAll({
		where: { user_id: userSession },
	});

	const transactions = await retrieveTransactions(accessIncomeSources);
	const accessToken = accessIncomeSources[0].accessToken;
	console.log(transactions)
	retrieveInstitution(accessToken)
	    
	return transactions;
};

module.exports = {
	getAllIncomeSources,
	getTransactions,
};
