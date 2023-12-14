import { configureStore } from '@reduxjs/toolkit';
import spotifyReducer from './spotifySlice';
import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    spotify: spotifyReducer,
  },
});
