import express from 'express';
import { userSignup, userSignin } from '../controllers/userController';
const userRouter = express.Router();

userRouter.post('/signin', userSignin);
userRouter.post('/signup', userSignup);

export default userRouter;
