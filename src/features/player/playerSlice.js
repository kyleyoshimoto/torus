import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Spotify from "../spotify/spotify";
import { spotifyProfileSlice } from "../spotify/spotifySlice";

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
            console.log(`CURRENTLY PLAYING:`, jsonResponse);

            return {
                device: jsonResponse.device.name,
                repeatState: jsonResponse.repeat_state,
                shuffleState: jsonResponse.shuffle_state,
                progressMs: jsonResponse.progress_ms,
                track: jsonResponse.item.name,
                artist: jsonResponse.item.artists.map(artist => artist.name).join(', '), // Handling multiple artists
                album: {
                    name: jsonResponse.item.album.name,
                    cover: jsonResponse.item.album.images[0]?.url || null,
                }
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

export default playerSlice;