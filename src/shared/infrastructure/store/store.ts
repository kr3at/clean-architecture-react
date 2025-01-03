import { configureStore } from '@reduxjs/toolkit';
import { postReducer } from './slices/postSlice';

export const store = configureStore({
  reducer: {
    // users: userReducer,
    posts: postReducer
  }
});

// Exportamos los tipos del store para usar con hooks de Redux
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
