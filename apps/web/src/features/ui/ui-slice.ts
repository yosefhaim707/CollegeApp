import { createSlice } from '@reduxjs/toolkit';

type UILocale = 'en' | 'he';

type UIState = {
  locale: UILocale;
  theme: 'dark' | 'light';
};

const initialState: UIState = {
  locale: (localStorage.getItem('locale') as UILocale) || 'en',
  theme: (localStorage.getItem('theme') as 'dark' | 'light') || 'dark',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLocale(state, action) {
      state.locale = action.payload;
      localStorage.setItem('locale', action.payload);
    },
    setTheme(state, action) {
      state.theme = action.payload;
      localStorage.setItem('theme', action.payload);
    },
  },
});

export const { setLocale, setTheme } = uiSlice.actions;
export default uiSlice.reducer;
