require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { userRouter } = require("./routes/user.routes");
const { budgetRouter } = require("./routes/budget.routes");
const { budgetItemRouter } = require("./routes/budgetItem.routes");
const { incomeSourceRouter } = require("./routes/incomeSource.routes")
const { plaidRouter } = require("./routes/plaid.routes")
const { googleRouter } = require("./routes/google.routes")

const cookieParser = require("cookie-parser");

const app = express();

const port = 8000;

const sequelize = require("./config/sequelize.config");

// require("dotenv").config();
require("body-parser");

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use("/api/users/", userRouter);
app.use("/api/budgets/", budgetRouter);
app.use("/api/budgetItems/", budgetItemRouter);
app.use("/api/incomeSources/", incomeSourceRouter)
app.use("/api/plaid/", plaidRouter)
app.use("/api/googleAuth/", googleRouter)


// app.use(cookieParser());
// app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.listen(port, () => {
	console.log(`Listening on port ${port} for requests to respond to`);
});


// sequelize.sync();
sequelize.sync({ force: true })
