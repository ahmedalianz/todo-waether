import {configureStore} from '@reduxjs/toolkit';
import todosReducer from './todosSlice';
import themeReducer from './themeSlice';

export const store = configureStore({
  reducer: {
    todosReducer,
    themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
