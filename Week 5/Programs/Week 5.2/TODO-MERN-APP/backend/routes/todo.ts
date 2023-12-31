import express from 'express';
import {
  createTodo,
  updateTodo,
  getTodos,
} from '../controllers/todoController';
import userMiddleware from '../middleware/auth';

const todoRouter = express.Router();

todoRouter.post('/', userMiddleware, createTodo);
todoRouter.get('/', userMiddleware, getTodos);
todoRouter.put('/', userMiddleware, updateTodo);

export default todoRouter;
