const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const healthChecker = require("./routes/healthChecker");
const walletRouter = require("./routes/walletRouter");
const transactionRouter = require("./routes/transactionRouter");

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.use('/healthCheck', healthChecker);

app.use('/setup', walletRouter);
app.use('/transact', transactionRouter);

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("MongoDB Connection Successful");
}).catch((error) => {
    console.error("Error: ", error)
});

app.listen(process.env.PORT, () => {
    console.log("Server is running on port: ", process.env.PORT)
});

