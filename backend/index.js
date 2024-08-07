const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/userRouter");
const errorHandler = require("./middlewares/errorHandlerMiddleware");
const categoryRouter = require("./routes/categoryRouter");
const transactionRouter = require("./routes/transactionRouter");
require('dotenv').config();
const app = express();
const uri = process.env.MONGODB_URI
//!Connect to mongodb
mongoose
    .connect(uri)
    .then(() => console.log("DB Connected"))
    .catch((e) => console.log(e));

//! Cors config
const corsOptions = {
    origin: [
        "http://localhost:5173",// local environment
        "https://expense-tracker-pwx1.vercel.app" // vercel app
    ],

};
app.use(cors(corsOptions));
//!Middlewares
app.use(express.json()); //?Pass incoming json data
//!Routes
app.use("/", userRouter);
app.use("/", categoryRouter);
app.use("/", transactionRouter);
//! Error
app.use(errorHandler);

//!Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
    console.log(`Server is running on this port... ${PORT} `)
);