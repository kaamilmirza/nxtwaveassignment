import { RootState } from './store';
import { setLoading, setError, setTodos, addTodo, removeTodo, updateTodo } from './todoReducer';
import axios, { AxiosError } from 'axios';

const API_BASE_URL = 'http://localhost:3000/api'; // Replace with your actual API base URL

// Helper function to create an axios instance with the current token
const createAxiosInstance = (getState: () => RootState) => {
  const token = getState().auth.token;
  return axios.create({
    baseURL: API_BASE_URL,
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const fetchTodos = (): any => async (dispatch: any, getState: any) => {
  dispatch(setLoading(true));
  try {
    const axiosInstance = createAxiosInstance(getState);
    const response = await axiosInstance.get('/todos');
    dispatch(setTodos(response.data));
  } catch (error) {
    const errorMessage = error instanceof AxiosError 
      ? error.response?.data?.message || 'An error occurred'
      : 'An unknown error occurred';
    dispatch(setError(errorMessage));
  } finally {
    dispatch(setLoading(false));
  }
};

export const createTodo = (text: string):any => async (dispatch: any, getState: any) => {
  dispatch(setLoading(true));
  try {
    const axiosInstance = createAxiosInstance(getState);
    const response = await axiosInstance.post(`${process.env.VITE_REACT_APP_API_URL}/api/todos`, { text, completed: false });
    dispatch(addTodo(response.data));
  } catch (error) {
    dispatch(setError('Error creating todo'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const deleteTodo = (id: number): any => async (dispatch: any, getState: any) => {
  dispatch(setLoading(true));
  try {
    const axiosInstance = createAxiosInstance(getState);
    await axiosInstance.delete(`${process.env.VITE_REACT_APP_API_URL}/api/todos/${id}`);
    dispatch(removeTodo(id));
  } catch (error) {
    dispatch(setError('Error deleting todo'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const updateTodoAction = (todo: { id: number; text: string; completed: boolean }): any => async (dispatch: any, getState: any) => {
  dispatch(setLoading(true));
  try {
    const axiosInstance = createAxiosInstance(getState);
    const response = await axiosInstance.put(`${process.env.VITE_REACT_APP_API_URL}/api/todos/${todo.id}`, todo);
    dispatch(updateTodo(response.data));
  } catch (error) {
    dispatch(setError('Error updating todo'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const toggleTodoComplete = (todo: { id: number; text: string; completed: boolean }): any => async (dispatch: any, getState: any) => {
  dispatch(setLoading(true));
  try {
    const axiosInstance = createAxiosInstance(getState);
    const response = await axiosInstance.put(`${process.env.VITE_REACT_APP_API_URL}/api/todos/${todo.id}`, { ...todo, completed: !todo.completed });
    dispatch(updateTodo(response.data));
  } catch (error) {
    dispatch(setError('Error toggling todo completion'));
  } finally {
    dispatch(setLoading(false));
  }
};