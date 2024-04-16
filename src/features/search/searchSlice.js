import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Spotify from "../spotify/spotify";

export const getSearch = createAsyncThunk(
    'search/getSearch',
    async (term) => {
        try {
            const accessToken = Spotify.getAccessToken();
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
            console.error(`Error getting search results.`, error);
            throw error;
        }
    }
);

export const getAttributes = createAsyncThunk(
    'search/getAttributes',
    async (ids) => {
        try {
            const accessToken = Spotify.getAccessToken();

            console.log(ids);
            
            const response = await fetch(`http://localhost:3001/spotify-data?ids=${ids}`, {
                method: 'GET',
                headers: { Authorization: `Bearer ${accessToken}` }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch attribute search results');
            }

            const jsonResponse = await response.json();

            console.log("Getting attribute search results...");

            const results = {};
            jsonResponse.audio_features.forEach(feature => {
                results[feature.id] = {
                    acousticness: feature.acousticness,
                    danceability: feature.danceability,
                    duration_ms: feature.duration_ms,
                    energy: feature.energy,
                    instrumentalnesss: feature.instrumentalness,
                    key: feature.key,
                    liveness: feature.liveness,
                    loudness: feature.loudness,
                    mode: feature.mode,
                    speechiness: feature.speechiness,
                    tempo: feature.tempo,
                    time_signature: feature.time_signature,
                    track_href: feature.track_href,
                    type: feature.type,
                    valence: feature.valence,
                };
            });

            return results;
        } catch (error) {
            console.error(`Error getting attribute search results. Search Term: ${ids}`, error);
            throw error;
        }
    }
);

export const getAttribute = createAsyncThunk(
    'search/getAttribute',
    async (ids) => {
        try {
            const accessToken = Spotify.getAccessToken();

            console.log(ids);
            
            const response = await fetch(`https://api.spotify.com/v1/audio-features?ids=${ids}`, {
                method: 'GET',
                headers: { Authorization: `Bearer ${accessToken}` }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch attribute search results');
            }

            const jsonResponse = await response.json();

            console.log("Getting attribute search results...");

            return jsonResponse.audio_features[0];

        } catch (error) {
            console.error(`Error getting attribute search results. Search Term: ${ids}`, error);
            throw error;
        }
    }
);

export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        results: [],
        loadingResults: false,
        errorResults: null,
        attributes: {},
        loadingAttributes: false,
        errorAttributes: null,
        attribute: {},
        loadingAttribute: false,
        errorAttribute: null,
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
        },
        [getAttributes.pending]: (state) => {
            state.loadingAttributes = true;
            state.errorAttributes = null;
        },
        [getAttributes.rejected]: (state,action) => {
            state.loadingAttributes = false;
            state.errorResults = action.error.message
        },
        [getAttributes.fulfilled]: (state, action) => {
            state.loadingAttributes = false;
            state.errorAttributes = null;
            state.attributes = action.payload;
        },
        [getAttribute.pending]: (state) => {
            state.loadingAttribute = true;
            state.errorAttribute = null;
        },
        [getAttribute.rejected]: (state,action) => {
            state.loadingAttribute = false;
            state.errorAttribute = action.error.message
        },
        [getAttribute.fulfilled]: (state, action) => {
            state.loadingAttribute = false;
            state.errorAttribute = null;
            state.attribute = action.payload;
        }
    }
});

export const selectResults = (state) => state.search.results;
export const selectAttributes = (state) => state.search.attributes;
export const selectAttribute = (state) => state.search.attribute;

export default searchSlice.reducer;