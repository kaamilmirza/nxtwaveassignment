import { createAsyncThunk } from '@reduxjs/toolkit';
import { setTodos, addTodo, updateTodo, deleteTodo, setLoading, setError } from './userReducer';
import { Todo } from './userReducer';
import axios from 'axios';

export const fetchTodos = createAsyncThunk(
  'user/fetchTodos',
  async (_, { dispatch, getState }) => {
    try {
      dispatch(setLoading(true));
      const { auth } = getState() as { auth: { token: string | null } };
      
      if (!auth.token) {
        throw new Error('No token found');
      }

      const response = await axios.get('/api/todos', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${auth.token}`,
        },
      });

      if (response.status !== 200) {
        throw new Error('Failed to fetch todos');
      }

      const todos = response.data;
      dispatch(setTodos(todos));
      dispatch(setLoading(false));
      return todos;
    } catch (error: any) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
      throw error;
    }
  }
);

export const createTodo = createAsyncThunk(
  'user/createTodo',
  async (todoData: { title: string }, { dispatch, getState }) => {
    try {
      dispatch(setLoading(true));
      const { auth } = getState() as { auth: { token: string | null } };
      
      if (!auth.token) {
        throw new Error('No token found');
      }

      const response = await axios.post('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`,
        },
        data: todoData,
      });

      if (response.status !== 200) {
        throw new Error('Failed to create todo');
      }

      const newTodo = response.data;
      dispatch(addTodo(newTodo));
      dispatch(setLoading(false));
      return newTodo;
    } catch (error: any) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
      throw error;
    }
  }
);

export const updateTodoItem = createAsyncThunk(
  'user/updateTodo',
  async (updatedTodo: Todo, { dispatch, getState }) => {
    try {
      dispatch(setLoading(true));
      const { auth } = getState() as { auth: { token: string | null } };
      
      if (!auth.token) {
        throw new Error('No token found');
      }

      const response = await axios.put(`/api/todos/${updatedTodo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`,
        },
        data: updatedTodo,
      });

      if (response.status !== 200) {
        throw new Error('Failed to update todo');
      }

      const updatedTodoData = response.data;
      dispatch(updateTodo(updatedTodoData));
      dispatch(setLoading(false));
      return updatedTodoData;
    } catch (error: any) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
      throw error;
    }
  }
);

export const deleteTodoItem = createAsyncThunk(
  'user/deleteTodo',
  async (todoId: string, { dispatch, getState }) => {
    try {
      dispatch(setLoading(true));
      const { auth } = getState() as { auth: { token: string | null } };
      
      if (!auth.token) {
        throw new Error('No token found');
      }

      const response = await axios.delete(`/api/todos/${todoId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${auth.token}`,
        },
      });

      if (response.status !== 200) {
        throw new Error('Failed to delete todo');
      }

      dispatch(deleteTodo(todoId));
      dispatch(setLoading(false));
      return todoId;
    } catch (error: any) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
      throw error;
    }
  }
);
