import { IncomeSource } from "../models/incomeSource.model";

const {
	retrieveBankInformation,
	retrieveTransactions,
	retrieveInstitution
} = require("./plaid.service");

const { getSessionId } = require("../utilities/getSessionId.utilities");

const getAllIncomeSources = async (userToken: string): Promise<{ incomeSources: IncomeSource[], total: number }> => {
	const userSession = getSessionId(userToken);

	const accessIncomeSources = await IncomeSource.findAll({
		where: { user_id: userSession },
	});

	const incomeSources: any[] = await retrieveBankInformation(accessIncomeSources);

	let total: number = 0;
	for (let i = 0; i < incomeSources.length; i++) {

		for (let j = 0; j < incomeSources[i].length; j++) {
			total += incomeSources[i][j].balances.current;
            
		}
	}
	console.log();
	
	return { incomeSources: incomeSources, total: total };

};

const getAllTransactions = async (userToken: string) => {
	const userSession = getSessionId(userToken);
	
	const accessIncomeSources = await IncomeSource.findAll({
		where: { user_id: userSession },
	});

	const transactions = await retrieveTransactions(accessIncomeSources);
	const accessToken = accessIncomeSources[0].accessToken;
	let test = await retrieveInstitution(accessToken)
	console.log(test);
	
	    
	return transactions;
};

module.exports = {
	getAllIncomeSources,
	getAllTransactions,
};
