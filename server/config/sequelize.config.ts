const config = require("../config/mysql.config.json");

import { Sequelize } from 'sequelize-typescript';
import { User } from "../models/user.model"
import { Budget } from "../models/budget.model"
import { BudgetItem } from "../models/budgetItem.model"



const sequelize = new Sequelize(
    config.database, 
    config.password, 
    config.user, {
        dialect: "mysql",
        host: config.host,
        define: {
            timestamps: false
        },
    },

);

sequelize.addModels([User, Budget, BudgetItem])

module.exports = sequelize;