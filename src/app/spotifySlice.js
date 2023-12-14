import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const spotifySlice = createSlice({
    name: 'spotify',
    initialState: {
        accessToken: ""
    },
    reducers: {
        addAccessToken: (state, action) => {
            state.accessToken = action.payload
        }
    }
});

export const { addAccessToken } = spotifySlice.actions;

export const selectAccessToken = (state) => state.spotify.accessToken;

export default spotifySlice.reducer;