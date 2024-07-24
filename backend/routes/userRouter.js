import express from 'express';
import usersController from '../controllers/usersCtrl.js';
import isAuthenticated from '../middlewares/isAuth.js';

const userRouter = express.Router();

//! Register
userRouter.post('/api/v1/users/register',usersController.register)
//! Login
userRouter.post('/api/v1/users/login', usersController.login);
//! Profile
userRouter.post('/api/v1/users/profile',isAuthenticated, usersController.profile);



export default userRouter