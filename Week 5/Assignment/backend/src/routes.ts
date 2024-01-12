import express from 'express';
import { getCards, createCard, deleteCard, updateCard } from './controllers/cardController';
import { createUser, getUser, loginUser } from './controllers/userController';
import userMiddleware from './middleware/auth';
const routes = express.Router();

routes.post('/login', loginUser);
routes.post('/signup', createUser);
routes.get('/auth', userMiddleware, getUser);

routes.get('/cards', userMiddleware, getCards);
routes.post('/cards', userMiddleware, createCard);
routes.delete('/cards/:id', userMiddleware, deleteCard);
routes.put('/cards/:id', userMiddleware, updateCard);

export default routes;
