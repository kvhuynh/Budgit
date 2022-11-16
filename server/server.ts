export {}

const express = require("express");
const cors = require("cors");
const { userRouter } = require("./routes/user.routes");
const cookieParser = require("cookie-parser");

const app = express();

const User = require("./models/user.model")
const Budget = require("./models/budget.model")

const port = 8000;

const sequelize = require("./config/sequelize.config");

require("dotenv").config();
require("body-parser");

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }))
app.use("/api/users/", userRouter);



app.listen(port, () => {
    console.log(`Listening on port ${port} for requests to respond to`);
})

sequelize.sync();
// sequelize.sync({ force: true })