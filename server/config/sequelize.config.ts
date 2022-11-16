export{}

const config = require("../config/mysql.config.json");
const Sequelize = require("sequelize");




const sequelize = new Sequelize(config.database, config.password, config.user, {
    dialect: "mysql",
    host: config.host,
    define: {
        timestamps: false
    }
});

// const verifyConnection = async () => {
//     try {
//         await sequelize.authenticate();
//         console.log("Sequelize connection has been established successfully");
        
//     } catch(error: any){
//         console.log("Failed to connect to database: ", error);
    
//     }
// }

// verifyConnection();

module.exports = sequelize;
