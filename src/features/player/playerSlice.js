import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Spotify from "../spotify/spotify";

export const getCurrentlyPlaying = createAsyncThunk(
    'player/getCurrentlyPlaying',
    async () => {
        try {
            const accessToken = Spotify.getAccessToken();
            const response = await fetch(`https://api.spotify.com/v1/me/player`, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch currently playing');
            }

            const jsonResponse = await response.json();

            return {
                device: {
                    name: jsonResponse.device.name,
                    volume: jsonResponse.device.volume_percent,
                },
                playback: {
                    repeatState: jsonResponse.repeat_state,
                    shuffleState: jsonResponse.shuffle_state,
                    isPlaying: jsonResponse.is_playing
                },
                track: {
                    name: jsonResponse.item.name,
                    artist: jsonResponse.item.artists.map(artist => artist.name).join(", "),
                    album: {
                        name: jsonResponse.item.album.name,
                        cover: jsonResponse.item.album.images[0]?.url || null,
                    }
                },
                timing: {
                    duration: jsonResponse.item.duration_ms,
                    progress: jsonResponse.progress_ms
                },
            };
        } catch (error) {
            console.error('Error fetching currently playing:', error);
            throw error; // Rethrow the error to inform Redux Toolkit about the failure
        }
    }
);

export const playerSlice = createSlice({
    name: 'player',
    initialState: {
        loadingCurrentlyPlaying: false,
        errorCurrentlyPlaying: null,
        currentlyPlaying: {},
        queue: [],
    },
    extraReducers: {
        [getCurrentlyPlaying.pending]: (state) => {
            state.loadingCurrentlyPlaying = true;
            state.errorCurrentlyPlaying = null;
        },
        [getCurrentlyPlaying.rejected]: (state, action) => {
            state.loadingCurrentlyPlaying = false;
            state.errorCurrentlyPlaying = action.error.message;
        },
        [getCurrentlyPlaying.fulfilled]: (state, action) => {
            state.loadingCurrentlyPlaying = false;
            state.errorCurrentlyPlaying = null;
            state.currentlyPlaying = action.payload;
        }
    }
});

export const selectCurrentlyPlaying = (state) => state.player.currentlyPlaying;
export const selectLoadingCurrentlyPlaying = (state) => state.player.loadingCurrentlyPlaying;
export const selectErrorCurrentlyPlaying = (state) => state.player.errorCurrentlyPlaying;

export default playerSlice.reducer;