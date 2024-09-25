import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import todoReducer from './todoReducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    todos: todoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

