import { v4 as uuidv4 } from 'uuid';
import Todo from '../../models/Todo';

export const getTodos = async (req: any, res: any) => {
  const todos = await Todo.findAll({
    where: { userId: req.body.userId },
  });
  res.status(200).json(todos);
};

export const createTodo = async (req: any, res: any) => {
  const { task, status } = req.body;
  const todoId = uuidv4();

  const newTodo = await Todo.create({
    id: todoId,
    task,
    status,
    userId: req.body.userId,
  });
  res.status(201).json(newTodo);
};

export const updateTodo = async (req: any, res: any) => {
  const { id, task, status } = req.body;
  const updatedTodo = await Todo.update({ task, status }, { where: { id, userId: req.body.userId } });
  res.status(200).json(updatedTodo);
};

export const deleteTodo = async (req: any, res: any) => {
  const { id } = req.body;
  await Todo.destroy({ where: { id, userId: req.body.userId } });
  res.status(200).json({ message: 'Todo deleted successfully' });
};

