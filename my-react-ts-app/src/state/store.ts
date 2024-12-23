// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import counterReducer, { counterInitialState } from './features/counter/counterSlice';
import authReducer, { authInitialState } from './features/auth/AuthSlice';

export interface RootState {
  counter: ReturnType<typeof counterReducer>;
  auth: ReturnType<typeof authReducer>;
}

// Define the root initial state
const rootInitialState: RootState = {
  counter: counterInitialState,
  auth: authInitialState,
};

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
  },
  preloadedState: rootInitialState, // Pass the root initial state here
});

// Export the type for use in components
export type AppDispatch = typeof store.dispatch;