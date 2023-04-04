export {};

import { User } from "../models/user.model";
import { IncomeSource } from "../models/incomeSource.model";

const {
    retrieveBankInformation,
    retrieveTransactions
} = require("./plaid.service")

const { getSessionId } = require("../utilities/getSessionId.utilities");

const getAllIncomeSources = async (userToken: string) => {

    const userSession = getSessionId(userToken);
    
    const accessIncomeSources = await IncomeSource.findAll({ where:{ user_id: userSession } })

    
    const incomeSources = await retrieveBankInformation(accessIncomeSources);

    let total = 0;
    for (let i = 0; i < incomeSources.length; i++) {
        // console.log(incomeSources[i].length);
        
        for (let j = 0; j < incomeSources[i].length; j++) {
            total += incomeSources[i][j].balances.current  
        }   
        console.log("*************");
    }

    
    console.log(total);
    
    console.log("do we get here");
    
    return {incomeSources: incomeSources, total: total}

    // return incomeSources
};

const handleRetrieveTransactions = async (userToken: string) => {

    const userSession = getSessionId(userToken);
    
    const accessIncomeSources = await IncomeSource.findAll({ where:{ user_id: userSession } })

    
    const incomeSources = await retrieveTransactions(accessIncomeSources);
    console.log(incomeSources);
    

}

module.exports = {
    getAllIncomeSources,
    handleRetrieveTransactions
};
