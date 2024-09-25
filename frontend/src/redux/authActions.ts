import { createAsyncThunk } from '@reduxjs/toolkit';
import { login, logout, updateUser } from './authReducer';
import { User } from './authReducer';
import axios from 'axios';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: {email: string; password: string }, { dispatch }) => {
    try {
      let response;
      response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/api/auth/login`, {
        email: credentials.email,
        password: credentials.password,
      });
      
      if (response.status !== 200) {
        throw new Error('Login failed');
      }

      const data = response.data;
      const { user, token } = data;

      dispatch(login({ user, token }));
      return { user, token };
    } catch (error) {
      throw error;
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { dispatch }) => {
    // Remove token from local storage
    localStorage.removeItem('token');
    dispatch(logout());
  }
);


export const signUpUser = createAsyncThunk(
  'auth/signUpUser',
  async (credentials: { name: string; email: string; password: string }, { dispatch }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/api/auth/signup`, {
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      });

      if (response.status !== 200) {    
        throw new Error('Failed to sign up');
      }

      const data = response.data;
      const { user, token } = data;

      dispatch(login({ user, token }));
      return { user, token };
    } catch (error) {
      throw error;
    }
  }
);

export const fetchUserByToken = createAsyncThunk(
  'auth/fetchUserByToken',
  async (_, { getState, dispatch }) => {
    try {
      const { auth } = getState() as { auth: { token: string | null } };
      
      if (!auth.token) {
        throw new Error('No token found');
      }

      const response = await axios.get(`${process.env.VITE_REACT_APP_API_URL}/api/profile`, {
        headers: {
          'Authorization': `Bearer ${auth.token}`,
        },
      });

      if (response.status !== 200) {
        throw new Error('Failed to fetch user profile');
      }

      const user = response.data;
      dispatch(updateUser(user));
      return user;
    } catch (error) {
      throw error;
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async (updatedUser: Partial<User>, { dispatch, getState }) => {
    try {
      const { auth } = getState() as { auth: { token: string | null } };
      
      // Replace this with your actual API call
      const response = await axios.put(`${process.env.VITE_REACT_APP_API_URL}/api/user/update`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.token}`,
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.status !== 200) {
        throw new Error('Failed to update user profile');
      }

      const updatedUserData = response.data;
      dispatch(updateUser(updatedUserData));
      return updatedUserData;
    } catch (error) {
      throw error;
    }
  }
);
