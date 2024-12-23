import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signUp } from '../../../api/AuthService';
import { SignUpRequest } from '../../../models/SignUpRequest';

export const signUpUser = createAsyncThunk(
  'auth/signUpUser',
  async (userData: SignUpRequest, { rejectWithValue }) => {
    try {
      const response = await signUp(userData);
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;