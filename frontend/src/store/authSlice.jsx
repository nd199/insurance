import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../api/services/auth.service';

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  policies: [],
};

export const fetchCustomerPolicies = createAsyncThunk(
  'auth/fetchCustomerPolicies',
  async (_, { getState, rejectWithValue }) => {
    const { token } = getState().auth;
    try {
      const res = await authService.getCustomerPolicies(token);
      return res.policies;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || 'Failed to fetch policies'
      );
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    },
    loginFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
      state.policies = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCustomerPolicies.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCustomerPolicies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.policies = action.payload;
      })
      .addCase(fetchCustomerPolicies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  authSlice.actions;

export default authSlice.reducer;
