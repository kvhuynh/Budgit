export {}

const mongoose = require("mongoose")

const dbName = "budgit_db"

mongoose
    .connect(`mongodb://localhost/${dbName}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log(`Successfully connected to ${dbName}`);
    })
    .catch((error: any) => {
        console.log(`mongoose connection to ${dbName} failed: `, error);
        
    })