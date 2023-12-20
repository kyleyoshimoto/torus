import { configureStore } from '@reduxjs/toolkit';
import spotifyProfileReducer from '../features/spotify/spotifySlice';
import playerReducer from '../features/player/playerSlice';
import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    spotifyProfile: spotifyProfileReducer,
    player: playerReducer,
  },
});
