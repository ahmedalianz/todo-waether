import {createSlice} from '@reduxjs/toolkit';

type ThemeType = 'light' | 'dark';

const initialState: {theme: ThemeType} = {theme: 'light'};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: state => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      document.getElementById('root')!.style.backgroundColor =
        state.theme === 'light' ? '#fff' : '#000';
    },
  },
});

export const {toggleTheme} = themeSlice.actions;

export default themeSlice.reducer;
