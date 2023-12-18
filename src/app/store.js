import { configureStore } from '@reduxjs/toolkit';
import spotifyProfileReducer from './spotifySlice';
import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    spotifyProfile: spotifyProfileReducer,
  },
});
