import express from 'express';
import { userSignup, userSignin, getUser } from '../controllers/userController';
import userMiddleware from '../middleware/auth';
const userRouter = express.Router();

userRouter.post('/signin', userSignin);
userRouter.post('/signup', userSignup);
userRouter.get('/auth', userMiddleware, getUser);

export default userRouter;
