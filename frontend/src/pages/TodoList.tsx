import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, removeTodo, updateTodo } from '../redux/todoReducer';
import { FaPlus, FaTrash, FaEdit, FaCheck } from 'react-icons/fa';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

    const dispatch = useDispatch();
    const {todos} = useSelector((state: any) => state.todos);

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      dispatch(addTodo({ id: Date.now(), text: newTodo, completed: false }));
      setNewTodo('');
    }
  };

  const handleRemoveTodo = (id: number) => {
    dispatch(removeTodo(id));
  };

  const handleUpdateTodo = (todo: Todo) => {
    dispatch(updateTodo({ ...todo, text: editText }));
    setEditingId(null);
  };

  const handleToggleComplete = (todo: Todo) => {
    dispatch(updateTodo({ ...todo, completed: !todo.completed }));
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="flex-grow p-2 border rounded-l"
          placeholder="Add a new todo"
        />
        <button
          onClick={handleAddTodo}
          className="bg-blue-500 text-white p-2 rounded-r"
        >
          <FaPlus />
        </button>
      </div>
      <ul>
        {todos.map((todo: any) => (
          <li key={todo.id} className="flex items-center mb-2">
            {editingId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="flex-grow p-2 border rounded-l"
                />
                <button
                  onClick={() => handleUpdateTodo(todo)}
                  className="bg-green-500 text-white p-2 rounded-r"
                >
                  <FaCheck />
                </button>
              </>
            ) : (
              <>
                <span
                  className={`flex-grow ${
                    todo.completed ? 'line-through text-gray-500' : ''
                  }`}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => handleToggleComplete(todo)}
                  className="text-blue-500 p-2"
                >
                  <FaCheck />
                </button>
                <button
                  onClick={() => {
                    setEditingId(todo.id);
                    setEditText(todo.text);
                  }}
                  className="text-yellow-500 p-2"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleRemoveTodo(todo.id)}
                  className="text-red-500 p-2"
                >
                  <FaTrash />
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
