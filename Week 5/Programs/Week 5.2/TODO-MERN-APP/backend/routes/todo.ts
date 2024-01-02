import express from 'express';
import {
  createTodo,
  updateTodo,
  getTodos,
  deleteTodo,
} from '../controllers/todoController';
import userMiddleware from '../middleware/auth';

const todoRouter = express.Router();

todoRouter.post('/', userMiddleware, createTodo);
todoRouter.get('/', userMiddleware, getTodos);
todoRouter.put('/', userMiddleware, updateTodo);
todoRouter.delete('/:id', userMiddleware, deleteTodo);

export default todoRouter;
