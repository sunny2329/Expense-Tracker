import express from 'express';
import userRouter from './routes/userRouter.js';
import categoryRouter from './routes/categoryRouter.js';
import mongoose from 'mongoose';
import errorHandler from './middlewares/errorHandlerMiddleware.js';
import transactionRouter from './routes/transactionRouter.js';

const app = express();

//!Connect to mongodb
mongoose.connect('mongodb+srv://sobhit230:AU4Te03RSXGQpCCk@cluster0.6y56mxv.mongodb.net/expense-tracker').then(() => {
    return console.log('Connected to MongoDB');
}).catch((e) => console.error(e));


//! Middlewares
app.use(express.json());

//! Routes
app.use('/', userRouter);
app.use('/',categoryRouter);
app.use('/',transactionRouter);

//! Error
app.use(errorHandler)



const PORT = process.env.PORT || 4000;
app.listen(PORT, console.log('listening on port ' + PORT));