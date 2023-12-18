import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Spotify from "./spotify";

export const getUserProfile = createAsyncThunk(
    'spotify/getUserProfile',
    async () => {
      try {
        const accessToken = Spotify.getAccessToken();
        const response = await fetch('https://api.spotify.com/v1/me', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }
  
        const jsonResponse = await response.json();
        console.log("USER PROFILE:");
        console.log(jsonResponse);
  
        return {
          name: jsonResponse.display_name,
          imageUrl: jsonResponse.images[0]?.url || null,
          followers: jsonResponse.followers?.total || 0,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    }
  );

export const spotifyProfileSlice = createSlice({
    name: 'spotifyProfile',
    initialState: {
        accessToken: "",
        userProfile: {},
        isLoadingProfile: false,
        failedToLoadProfile: null,
    },
    reducers: {
        addAccessToken: (state, action) => {
            state.accessToken = action.payload
        }
    },
    extraReducers: {
        [getUserProfile.pending]: (state) => {
            state.isLoadingProfile = true;
            state.failedToLoadComments = null;
        },
        [getUserProfile.rejected]: (state, action) => {
            state.isLoadingProfile = false;
            state.failedToLoadComments = action.error.message;
        },
        [getUserProfile.fulfilled]: (state, action) => {
            state.isLoadingProfile = false;
            state.failedToLoadComments = false;
            state.userProfile = action.payload;
        }
    }
});

export const { addAccessToken } = spotifyProfileSlice.actions;

export const selectAccessToken = (state) => state.spotifyProfile.accessToken;
export const selectProfile = (state) => state.spotifyPorfile.userProfile;

export default spotifyProfileSlice.reducer;