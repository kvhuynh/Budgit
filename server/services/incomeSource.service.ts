export {};

import { User } from "../models/user.model";
import { IncomeSource } from "../models/incomeSource.model";

const { getSessionId } = require("../utilities/getSessionId.utilities");

const getAllIncomeSources = async (userToken: string) => {

    const userSession = getSessionId(userToken);
    
    const incomeSources = await IncomeSource.findAll({ where:{ user_id: userSession } })
    console.log(incomeSources);
    
    return incomeSources
};

module.exports = {
    getAllIncomeSources
};
