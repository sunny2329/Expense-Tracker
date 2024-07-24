import express from 'express';
import transactionController from '../controllers/transactionCtrl';
import isAuthenticated from '../middlewares/isAuth';


const transactionRouter = express.Router();


//! add
transactionRouter.post('/api/v1/transactions/create',isAuthenticated,transactionController.create);

//! lists
transactionRouter.get('/api/v1/transactions/list',isAuthenticated,transactionController.lists);

export default transactionRouter;