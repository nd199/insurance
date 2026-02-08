import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  role: null,
  isAuthenticated: false,
  isLoading: false,
  loginError: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.isLoading = true;
      state.loginError = null;
    },
    loginSuccess(state, action) {
      state.user = action.payload;
      state.role = action.payload.role;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.loginError = null;
    },
    loginFailure(state, action) {
      state.isLoading = false;
      state.loginError = action.payload;
    },
    logout(state) {
      state.user = null;
      state.role = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.loginError = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  authSlice.actions;

export default authSlice.reducer;
