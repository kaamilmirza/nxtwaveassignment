import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoReducer';


export const store = configureStore({
  reducer: {
    todos: todoReducer,
    // auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

