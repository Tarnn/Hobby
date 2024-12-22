// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';

export interface RootState {
  counter: ReturnType<typeof counterReducer>;
}

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

// Export the type for use in components
export type AppDispatch = typeof store.dispatch;