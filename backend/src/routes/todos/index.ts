import { Router } from 'express';
import { authenticateToken } from '../../middleware/authenticate';
import { getTodos, createTodo } from '../../controllers/todos';

const todoRoutes = Router();

todoRoutes.get('/', authenticateToken, getTodos);
todoRoutes.post('/', authenticateToken, createTodo);

export default todoRoutes;
