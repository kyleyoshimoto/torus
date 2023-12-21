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
                    progress: jsonResponse.progress_ms,
                    isPlaying: jsonResponse.is_playing
                },
            };
        } catch (error) {
            console.error('Error fetching currently playing:', error);
            throw error; // Rethrow the error to inform Redux Toolkit about the failure
        }
    }
);

export const pause = createAsyncThunk(
    'player/pause',
    async () => {
        try {
            const accessToken = Spotify.getAccessToken();
            const response = await fetch('https://api.spotify.com/v1/me/player/pause', {
                method: 'PUT',
                headers: { Authorization: `Bearer ${accessToken}` }
            });

            if (response.ok) {
                const updatedData = await response.json();
                console.log(`DATA SUCCESSFULLY UPDATED, MUSIC PAUSED: ${updatedData}`);
                return false;
            } else {
                throw new Error('Failed to pause track.')
            }
        } catch (error) {
            console.error('Error fetching currently playing:', error);
            throw error; // Rethrow the error to inform Redux Toolkit about the failure
        }
    }
)

export const play = createAsyncThunk(
    'player/play',
    async () => {
        try {
            const accessToken = Spotify.getAccessToken();
            const response = await fetch('https://api.spotify.com/v1/me/player/play', {
                method: 'PUT',
                headers: { Authorization: `Bearer ${accessToken}` },
                body: ''
            });

            if (response.ok) {
                const updatedData = await response.json();
                console.log(`DATA SUCCESSFULLY UPDATED, MUSIC PAUSED: ${updatedData}`);
                return false;
            } else {
                throw new Error('Failed to pause track.')
            }
        } catch (error) {
            console.error('Error fetching currently playing:', error);
            throw error; // Rethrow the error to inform Redux Toolkit about the failure
        }
    }
)

export const playerSlice = createSlice({
    name: 'player',
    initialState: {
        loadingCurrentlyPlaying: false,
        errorCurrentlyPlaying: null,
        currentlyPlaying: {},
        isPlaying: false,
        queue: [],
    },
    reducers: {
        updateStatus: (state, action) => {
            state.isPlaying = action.payload;
        }
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
        },
        [pause.fulfilled]: (state) => {
            state.currentlyPlaying.timing.isPlaying = false;
        }
    }
});

export const { updateStatus } = playerSlice.actions;

export const selectCurrentlyPlaying = (state) => state.player.currentlyPlaying;
export const selectLoadingCurrentlyPlaying = (state) => state.player.loadingCurrentlyPlaying;
export const selectErrorCurrentlyPlaying = (state) => state.player.errorCurrentlyPlaying;
export const selectIsPlaying = (state) => state.player.isPlaying;

export default playerSlice.reducer;