export {};

import { User } from "../models/user.model";
import { IncomeSource } from "../models/incomeSource.model";

const {
    retrieveBankInformation
} = require("./plaid.service")

const { getSessionId } = require("../utilities/getSessionId.utilities");

const getAllIncomeSources = async (userToken: string) => {

    const userSession = getSessionId(userToken);
    
    const accessIncomeSources = await IncomeSource.findAll({ where:{ user_id: userSession } })

    
    const incomeSources = await retrieveBankInformation(accessIncomeSources);

    console.log("retrieving income sources from database: " + incomeSources.length);
    
    return incomeSources
};

module.exports = {
    getAllIncomeSources
};
