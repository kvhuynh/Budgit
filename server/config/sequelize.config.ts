const config = require("../config/mysql.config.json");

import { Sequelize } from 'sequelize-typescript';
import { User } from "../models/user.model"
import { Budget } from "../models/budget.model"
import { BudgetItem } from "../models/budgetItem.model"
import { IncomeSource } from "../models/incomeSource.model"
import { ThirdPartyAuth } from '../models/thirdPartyAuth';

const sequelize = new Sequelize(
    
    config.database, 
    config.password, 
    config.user, {
        dialect: "mysql",
        host: config.host,
        define: {
            timestamps: false
        },
        logging: false // comment if you want to see sql queries
    },
    

);

sequelize.addModels([User, Budget, BudgetItem, IncomeSource, ThirdPartyAuth])

module.exports = sequelize;