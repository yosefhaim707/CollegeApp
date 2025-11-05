import { createSlice } from '@reduxjs/toolkit';
import { api } from '../../lib/api';

type AuthState = {
  token: string | null;
  user: { email: string } | null;
};

const initialState: AuthState = {
  token: null,
  user: null,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.login.matchFulfilled, (state, { payload }) => {
      state.token = payload.token;
      state.user = payload.user;
      localStorage.setItem('token', payload.token);
    });
  },
});

export const { logout } = slice.actions;
export default slice.reducer;
