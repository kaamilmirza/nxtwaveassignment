import { Router } from 'express';
import { isAuthenticated } from '../../middleware/authenticate';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../../controllers/todos';

const todoRoutes = Router();

todoRoutes.get('/', isAuthenticated, getTodos);
todoRoutes.post('/', isAuthenticated, createTodo);
todoRoutes.put('/', isAuthenticated, updateTodo);
todoRoutes.delete('/', isAuthenticated, deleteTodo);

export default todoRoutes;
