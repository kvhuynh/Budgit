const express = require("express")
const cors = require("cors")

const port = 8000;

const { userRouter } = require("./routes/user.routes")


require("./config/mongoose.config")

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/users/", userRouter);



app.listen(port, () => {
    console.log(`Listening on port ${port} for requests to respond to`);
})