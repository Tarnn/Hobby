import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { logOut, signUp } from "../../../api/AuthService";
import { SignUpRequest } from "../../../models/SignUpRequest";
import { AuthProfile } from "../../../models/AuthResponse";

export interface AuthInitialState {
  user: AuthProfile | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: any;
}
export const authInitialState: AuthInitialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async (userData: SignUpRequest, { rejectWithValue }) => {
    try {
      const response = await signUp(userData);

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const logOutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await logOut();
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        signUpUser.fulfilled,
        (state, action: PayloadAction<AuthProfile>) => {
          state.loading = false;
          state.user = action.payload;
          state.isAuthenticated = true;
        }
      )
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logOutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logOutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logOutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
