import express from 'express';
import { getCards, createCard, deleteCard } from './controllers/cardController';
const routes = express.Router();

routes.post('/login');
routes.get('/', getCards);
routes.post('/', createCard);
routes.delete('/:id', deleteCard);

export default routes;
