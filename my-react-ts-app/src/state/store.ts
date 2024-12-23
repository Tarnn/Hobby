// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';
import authReducer from './features/auth/AuthSlice';

export interface RootState {
  counter: ReturnType<typeof counterReducer>;
}

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
  },
});

// Export the type for use in components
export type AppDispatch = typeof store.dispatch;