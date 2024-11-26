import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Spotify from "../spotify/spotify";

// Async Thunk to save playlist
export const savePlaylist = createAsyncThunk(
    'playlist/savePlaylist',
    async ({ name, trackUris }, { rejectWithValue }) => {
        if (!name || !trackUris.length) return rejectWithValue("Invalid playlist name or tracks");

        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };

        try {
            // Get the current user's ID
            const userResponse = await fetch('https://api.spotify.com/v1/me', { headers });
            const { id: userId } = await userResponse.json();

            // Create a new playlist
            const playlistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                headers,
                method: 'POST',
                body: JSON.stringify({ name }),
            });
            const { id: playlistId } = await playlistResponse.json();

            // Add tracks to the new playlist
            await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                headers,
                method: 'POST',
                body: JSON.stringify({ uris: trackUris }),
            });

            console.log("Successfully saved playlist:", name);

            return { name, trackUris }; // Return useful data for the fulfilled case
        } catch (error) {
            console.error("Error saving playlist:", error);
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    tracks: [], // Store track IDs
    status: 'idle', // Status of the async operation
    error: null,   // Error message if any
};



const playlistSlice = createSlice({
    name: 'playlist',
    initialState,
    reducers: {
        addToPlaylist: (state, action) => {
            if (!state.tracks.includes(action.payload)) {
                state.tracks.push(action.payload);
            }
        },
        removeFromPlaylist: (state, action) => {
            state.tracks = state.tracks.filter(trackId => trackId !== action.payload);
        },
        clearPlaylist: (state) => {
            state.tracks = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(savePlaylist.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(savePlaylist.fulfilled, (state) => {
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(savePlaylist.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const { addToPlaylist, removeFromPlaylist, clearPlaylist } = playlistSlice.actions;

export const selectPlaylist = (state) => state.playlist.tracks;
export const selectPlaylistStatus = (state) => state.playlist.status;
export const selectPlaylistError = (state) => state.playlist.error;

export default playlistSlice.reducer;