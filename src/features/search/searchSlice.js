import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Spotify from "../spotify/spotify";

export const getSearch = createAsyncThunk(
    'search/getSearch',
    async (term) => {
        try {
            const accessToken = Spotify.getAccessToken();
            //const updatedTerm = encodeURIComponent(term);
            const updatedTerm = term.split(' ').join('+');

            console.log(updatedTerm);
            
            const response = await fetch(`https://api.spotify.com/v1/search?q=${updatedTerm}&limit=25&type=track%2Cartist%2Calbum`, {
                method: 'GET',
                headers: { Authorization: `Bearer ${accessToken}` }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch search results');
            }

            const jsonResponse = await response.json();

            console.log("Getting search results...");

            return jsonResponse.tracks.items.map(track => ({
                name: track.name,
                uri: track.uri,
                id: track.id,
                artist: track.artists.map(artist => artist.name).join(", "),
                album: {
                    name: track.album.name,
                    cover: track.album.images[0]?.url
                },
                genre: track.artists[0].genres,
                duration: track.duration_ms
            }))
        } catch (error) {
            console.error(`Error getting search results. Search Term: ${updatedTerm}`, error);
            throw error;
        }
    }
);

export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        results: [],
        loadingResults: false,
        errorResults: null
    },
    extraReducers: {
        [getSearch.pending]: (state) => {
            state.loadingResults = true;
            state.errorResults = null;
        },
        [getSearch.rejected]: (state, action) => {
            state.loadingResults = false;
            state.errorResults = action.error.message;
        },
        [getSearch.fulfilled]: (state, action) => {
            state.loadingResults = false;
            state.errorResults = null;
            state.results = action.payload;
        }
    }
});

export const selectResults = (state) => state.search.results;

export default searchSlice.reducer;