// src/features/counter/counterSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const counterInitialState = { value: 0 };

const counterSlice = createSlice({
  name: 'counter',
  initialState: counterInitialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;
export { counterInitialState };
export default counterSlice.reducer;