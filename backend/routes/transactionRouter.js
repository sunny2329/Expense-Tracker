import express from 'express';
import transactionController from '../controllers/transactionCtrl';
import isAuthenticated from '../middlewares/isAuth';


const transactionRouter = express.Router();


//! add
transactionRouter.post('/api/v1/transactions/create', isAuthenticated, transactionController.create);

//! lists
transactionRouter.get('/api/v1/transactions/list', isAuthenticated, transactionController.getFilteredTransactions);

//! update
transactionRouter.put('/api/v1/transactions/update/:id', isAuthenticated, transactionController.update);

//! delete
transactionRouter.delete('/api/v1/transactions/delete/:id', isAuthenticated, transactionController.delete);

export default transactionRouter;