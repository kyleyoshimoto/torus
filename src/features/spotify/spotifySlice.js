import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Spotify from "./spotify";

export const getUserProfile = createAsyncThunk(
    'spotifyProfile/getUserProfile',
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
        console.log(`USER PROFILE: ${jsonResponse}`);

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

export const getUserPlaylists = createAsyncThunk(
    'spotifyProfile/getUserPlaylists',
    async () => {
        try {
            const accessToken = Spotify.getAccessToken();
            const response = await fetch('https://api.spotify.com/v1/me/playlists', {
                headers: { Authorization: `Bearer ${accessToken}` },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch user playlists.");
            }

            const jsonResponse = await response.json();

            return jsonResponse.items.map(item => ({
                name: item.name,
                id: item.id,
                href: item.tracks.href,
                total: item.tracks.total,
                uri: item.uri,
                img: item.images[0].url
            }));
            
        } catch (error) {
            throw new Error(error.message);
        }
    }
);

export const getPlaylistItems = createAsyncThunk(
    'spotifyProfile/getPlaylistItems',
    async (id) => {
        try {
            const accessToken = Spotify.getAccessToken();
            const response = await fetch(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });

            if (!response.ok) {
                throw new Error("Failed to fetch playlist items.");
            }

            const jsonResponse = await response.json();

            return jsonResponse.items.map(item => ({
                name: item.track.name,
                uri: item.track.uri,
                id: item.track.id,
                artist: item.track.artists.map(artist => artist.name).join(", "),
                album: {
                    name: item.track.album.name,
                    cover: item.track.album.images[0]?.url
                }
            }));

        } catch (error) {
            console.error('Error getting recently played', error);
            throw error;
        }
    }
)

export const getTopTracks = createAsyncThunk(
    'spotifyProfile/getTopTracks',
    async (term = "short_term") => {
        try {
            const accessToken = Spotify.getAccessToken();
            const response = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=${term}`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user top items')
            }

            const jsonResponse = await response.json();
            console.log(`USERS TOP TRACKS: ${jsonResponse}`);

            return jsonResponse.items.map(track => ({
                name: track.name,
                id: track.id,
                artist: track.artists[0]?.name,
                album: {
                    name: track.album.name,
                    cover: track.album.images[0]?.url,
                    id: track.album.id
                }
            }));

        } catch (error) {
            throw new Error(error.message);
        }
    }
);

export const getTopArtists = createAsyncThunk(
    'spotifyProfile/getTopArtists',
    async (term = "short_term") => {
        try {
            const accessToken = Spotify.getAccessToken();
            const response = await fetch(`https://api.spotify.com/v1/me/top/artists?time_range=${term}`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user top artists')
            }

            const jsonResponse = await response.json();
            console.log(`USERS TOP ARTISTS: ${jsonResponse}`);

            return jsonResponse.items.map(artist => ({
                name: artist.name,
                id: artist.id,
                genre: artist.genres,
                image: artist.images[0]?.url
            }));

        } catch (error) {
            throw new Error(error.message);
        }
    }
);

export const spotifyProfileSlice = createSlice({
    name: 'spotifyProfile',
    initialState: {
        accessToken: "",
        displayName: "",
        profilePic: "",
        followers: null,
        isLoadingProfile: false,
        failedToLoadProfile: null,
        playlists: [],
        loadingPlaylists: false,
        errorPlaylists: null,
        playlistItems: [],
        loadingPlaylistItems: false,
        errorPlaylistItems: null,
        isLoadingTopTracks: false,
        failedToLoadTopTracks: null,
        topTracks: [],
        isLoadingTopArtists: false,
        failedToLoadTopArtists: null,
        topArtists: [],
    },
    reducers: {
        addAccessToken: (state, action) => {
            state.accessToken = action.payload
        }
    },
    extraReducers: {
        [getUserProfile.pending]: (state) => {
            state.isLoadingProfile = true;
            state.failedToLoadProfile= null;
        },
        [getUserProfile.rejected]: (state, action) => {
            state.isLoadingProfile = false;
            state.failedToLoadProfile = action.error.message;
        },
        [getUserProfile.fulfilled]: (state, action) => {
            state.isLoadingProfile = false;
            state.failedToLoadProfile = null;
            const { name, imageUrl, followers} = action.payload;
            state.displayName = name;
            state.profilePic = imageUrl;
            state.followers = followers;
        },
        [getTopTracks.pending]: (state) => {
            state.isLoadingTopItems = true;
            state.failedToLoadTopItems = null;
        },
        [getTopTracks.rejected]: (state, action) => {
            state.isLoadingTopItems = false;
            state.failedToLoadTopItems = action.error.message;
        },
        [getTopTracks.fulfilled]: (state, action) => {
            state.isLoadingTopItems = false;
            state.failedToLoadTopItems = null;
            state.topTracks = action.payload;
        },
        [getTopArtists.pending]: (state) => {
            state.isLoadingTopArtists = true;
            state.failedToLoadTopArtists = null;
        },
        [getTopArtists.rejected]: (state, action) => {
            state.isLoadingTopArtists = false;
            state.failedToLoadTopArtists = action.error.message;
        },
        [getTopArtists.fulfilled]: (state, action) => {
            state.isLoadingTopArtists = false;
            state.failedToLoadTopArtists = null;
            state.topArtists = action.payload;
        },
        [getUserPlaylists.pending]: (state) => {
            state.loadingPlaylists = true;
            state.errorPlaylists = null;
        },
        [getUserPlaylists.rejected]: (state, action) => {
            state.loadingPlaylists = false;
            state.errorPlaylists = action.error.message;
        },
        [getUserPlaylists.fulfilled]: (state, action) => {
            state.loadingPlaylists = true;
            state.errorPlaylists = null;
            state.playlists = action.payload;
        },
        [getPlaylistItems.pending]: (state) => {
            state.loadingPlaylistItems = true;
            state.errorPlaylistItems = null;
        },
        [getPlaylistItems.rejected]: (state, action) => {
            state.loadingPlaylistItems = false;
            state.errorPlaylistItems = action.error.message;
        },
        [getPlaylistItems.fulfilled]: (state, action) => {
            state.loadingPlaylistItems = true;
            state.errorPlaylistItems = null;
            state.playlistItems = action.payload;
        }
    }
});

export const { addAccessToken } = spotifyProfileSlice.actions;

export const selectAccessToken = (state) => state.spotifyProfile.accessToken;
export const selectProfile = (state) => state.spotifyProfile.userProfile;
export const selectDisplayName = (state) => state.spotifyProfile.displayName;
export const selectProfilePic = (state) => state.spotifyProfile.profilePic;
export const selectPlaylists = (state) => state.spotifyProfile.playlists;
export const selectPlaylistItems = (state) => state.spotifyProfile.playlistItems;
export const selectFollowers = (state) => state.spotifyProfile.followers;
export const selectTopTracks = (state) => state.spotifyProfile.topTracks;
export const selectTopArtists = (state) => state.spotifyProfile.topArtists;

export default spotifyProfileSlice.reducer;