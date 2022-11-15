const express = require("express");
const cors = require("cors");
const { userRouter } = require("./routes/user.routes");
const cookieParser = require("cookie-parser");


const app = express();

const port = 8000;


require("dotenv").config();

require("./config/mongoose.config")


app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }))
app.use("/api/users/", userRouter);



app.listen(port, () => {
    console.log(`Listening on port ${port} for requests to respond to`);
})