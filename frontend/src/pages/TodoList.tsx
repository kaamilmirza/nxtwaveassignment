import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Plus, Trash, Edit, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { fetchTodos, createTodo, deleteTodo, updateTodoAction, toggleTodoComplete } from '../redux/todoActions';
import { RootState, AppDispatch } from '../redux/store';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  const dispatch = useDispatch<AppDispatch>();
  const { todos, loading, error } = useSelector((state: RootState) => state.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      dispatch(createTodo(newTodo));
      setNewTodo('');
    }
  };

  const handleRemoveTodo = (id: number) => {
    dispatch(deleteTodo(id));
  };

  const handleUpdateTodo = (todo: Todo) => {
    dispatch(updateTodoAction({ ...todo, text: editText }));
    setEditingId(null);
  };

  const handleToggleComplete = (todo: Todo) => {
    dispatch(toggleTodoComplete(todo));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <div className="flex mb-4 space-x-2">
        <Input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
        />
        <Button onClick={handleAddTodo} size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <ul className="space-y-2">
        {todos.map((todo: any) => (
          <li key={todo.id} className="flex items-center space-x-2">
            {editingId === todo.id ? (
              <>
                <Input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="flex-grow"
                />
                <Button onClick={() => handleUpdateTodo(todo)} size="icon" variant="outline">
                  <Check className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <Checkbox
                  checked={todo.completed}
                  onCheckedChange={() => handleToggleComplete(todo)}
                  id={`todo-${todo.id}`}
                />
                <label
                  htmlFor={`todo-${todo.id}`}
                  className={`flex-grow ${
                    todo.completed ? 'line-through text-gray-500' : ''
                  }`}
                >
                  {todo.text}
                </label>
                <Button
                  onClick={() => {
                    setEditingId(todo.id);
                    setEditText(todo.text);
                  }}
                  size="icon"
                  variant="outline"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => handleRemoveTodo(todo.id)}
                  size="icon"
                  variant="outline"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
