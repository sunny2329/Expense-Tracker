import express from 'express';
import categoryController from '../controllers/categoryCtrl';
import isAuthenticated from '../middlewares/isAuth';


const categoryRouter = express.Router();


//! add
categoryRouter.post('/api/v1/categories/create', isAuthenticated, categoryController.create);

//! lists
categoryRouter.get('/api/v1/categories/list', isAuthenticated, categoryController.lists);

//! update
categoryRouter.put('/api/v1/categories/update/:id', isAuthenticated, categoryController.update);

//! delete
categoryRouter.delete('/api/v1/categories/delete/:id', isAuthenticated, categoryController.delete);

export default categoryRouter;