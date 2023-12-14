import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const spotifySlice = createSlice({
    name: 'spotify',
    initialState: {
        accessKey: ""
    },
    reducers: {
        addAccessKey: (state, action) => {
            state.accessKey = action.payload
        }
    }
});