import { configureStore } from '@reduxjs/toolkit';
import spotifyProfileReducer from '../features/spotify/spotifySlice';
import playerReducer from '../features/player/playerSlice';
import searchReducer from '../features/search/searchSlice';

export const store = configureStore({
  reducer: {
    spotifyProfile: spotifyProfileReducer,
    player: playerReducer,
    search: searchReducer,
  },
});