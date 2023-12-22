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

            console.log("Getting currently playing...")

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

export const playPause = createAsyncThunk(
    'player/playPause',
    async (startStop) => {
        try {
            const accessToken = Spotify.getAccessToken();
            const response = await fetch(`https://api.spotify.com/v1/me/player/${startStop}`, {
                method: 'PUT',
                headers: { Authorization: `Bearer ${accessToken}` },
            });

            if (response.ok) {
                //const updatedData = await response.json();
                console.log(`DATA SUCCESSFULLY UPDATED, MUSIC ${startStop}ING`);
                if (startStop === 'play') {
                    return true;
                }
                return false;
            } else {
                throw new Error(`Failed to ${startStop} track.`)
            }
        } catch (error) {
            console.error(`Error ${startStop} currently playing:`, error);
            throw error; // Rethrow the error to inform Redux Toolkit about the failure
        }
    }
);

export const skipTrack = createAsyncThunk(
    'player/skipTrack',
    async (skip) => {
        try {
            const accessToken = Spotify.getAccessToken();
            const response = await fetch(`https://api.spotify.com/v1/me/player/${skip}`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${accessToken}` }
            });

            if (response.ok) {
                console.log(`DATA SUCCESSFULLY UPDATED, MUSIC SKIPPED ${skip}`);
            } else {
                throw new Error(`Failed to skip ${skip}.`)
            }
        } catch (error) {
            console.error(`Error skipping to ${skip}.`, error);
            throw error;
        }
    }
);

export const changeVolume = createAsyncThunk(
    'player/changeVolume',
    async (volume) => {
        try {
            const accessToken = Spotify.getAccessToken();
            const response = await fetch(`https://api.spotify.com/v1/me/player/volume?volume_percent=${volume}`, {
                method: 'PUT',
                headers: { Authorization: `Bearer ${accessToken}` },
            });

            if (response.ok) {
                // Handle success case here
                return true;
            } else {
                // Handle non-OK response status (e.g., 4xx, 5xx)
                console.error('Failed to change volume. Status:', response.status);
                return false;
            }
        } catch (error) {
            console.error('Error changing volume:', error);
            throw error;
        }
    }
);

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
            state.isPlaying = action.payload.timing.isPlaying;
        },
    }
});

export const { updateStatus } = playerSlice.actions;

export const selectCurrentlyPlaying = (state) => state.player.currentlyPlaying;
export const selectLoadingCurrentlyPlaying = (state) => state.player.loadingCurrentlyPlaying;
export const selectErrorCurrentlyPlaying = (state) => state.player.errorCurrentlyPlaying;
export const selectIsPlaying = (state) => state.player.isPlaying;

export default playerSlice.reducer;