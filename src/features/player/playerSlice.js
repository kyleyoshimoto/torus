import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Spotify from "../spotify/spotify";

export const playSong = createAsyncThunk(
    'player/playSong',
    async (songURI) => {
        try {
            const accessToken = Spotify.getAccessToken();

            let bodyData;
            if (Array.isArray(songURI)) {
                bodyData = {
                    uris: songURI,
                    offset: { position: 0 },
                    position_ms: 0
                };
            } else {
                bodyData = {
                    context_uri: songURI,
                    offset: {position: 0},
                    position_ms: 0
                };
            }

            const response = await fetch('https://api.spotify.com/v1/me/player/play', {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bodyData)
            });

            if (response.ok) {
                console.log(`Successfully started playing song with URI: ${songURI}`);
                return true;
            } else {
                throw new Error(`Failed to start playing song with URI: ${songURI}`);
            }
        } catch (error) {
            console.error('Error starting to play song.', error);
            throw error;
        }
    }
)

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

            console.log(`Currently Playing: ${jsonResponse}`);

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
                    id: jsonResponse.item.id,
                    artist: jsonResponse.item.artists.map(artist => artist.name).join(", "),
                    artistId: jsonResponse.item.artists[0].id,
                    album: {
                        name: jsonResponse.item.album.name,
                        cover: jsonResponse.item.album?.images,
                    }
                },
                timing: {
                    duration: jsonResponse.item.duration_ms,
                    progress: jsonResponse.progress_ms,
                    isPlaying: jsonResponse.is_playing
                }
            };
        } catch (error) {
            console.error('Error fetching currently playing:', error);
            throw error; // Rethrow the error to inform Redux Toolkit about the failure
        }
    }
);

export const getQueue = createAsyncThunk(
    'player/getQueue',
    async () => {
        try {
            const accessToken = Spotify.getAccessToken();
            const response = await fetch(`https://api.spotify.com/v1/me/player/queue`, {
                method: 'GET',
                headers: { Authorization: `Bearer ${accessToken}` }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch queue.');
            }

            const jsonResponse = await response.json();

            return {
                queueList: jsonResponse.queue.map(track => ({
                    name: track.name,
                    uri: track.uri,
                    id: track.id,
                    artist: track.artists.map(artist => artist.name).join(", "),
                    album: {
                        name: track.album.name,
                        cover: track.album.images[0]?.url
                    },
                    genre: track.artists[0].genres,
                    duration: track.duration_ms,
                })),
                uris: jsonResponse.queue.map(track => (track.uri))
            }
        } catch (error) {
            console.error('Error getching queue.', error);
            throw error;
        }
    }
);

export const getCurrentArtist = createAsyncThunk(
    'player/getCurrentArtist',
    async (artistId) => {
        try {
            const accessToken = Spotify.getAccessToken();
            const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
                method: 'GET',
                headers: { Authorization: `Bearer ${accessToken}` }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch queue.');
            }

            const jsonResponse = await response.json();

            return {
                name: jsonResponse.name,
                uri: jsonResponse.uri,
                id: jsonResponse.id,
                followers: jsonResponse.followers.total,
                genres: jsonResponse.genres,
                image: jsonResponse.images[0].url,
            };

        } catch (error) {
            console.error('Error getching queue.', error);
            throw error;
        }
    }
);

export const getRecentlyPlayed = createAsyncThunk(
    'player/getRecentlyPlayed',
    async (after) => {
        try {
            const accessToken = Spotify.getAccessToken();
            const response = await fetch(`https://api.spotify.com/v1/me/player/recently-played?limit=15&after=${after}`, {
                method: 'GET',
                headers: { Authorization: `Bearer ${accessToken}`}
            });

            if (!response.ok) {
                throw new Error('Failed to fetch recently played.');
            }

            const jsonResponse = await response.json();
            
            console.log('Successfully obtained recently played');

            return jsonResponse.items.map(item => ({
                name: item.track.name,
                uri: item.track.uri,
                id: item.track.id,
                artist: item.track.artists.map(artist => artist.name).join(", "),
                album: {
                    name: item.track.album.name,
                    cover: item.track.album.images[0]?.url
                },
                genre: item.track.artists[0].genres,
                duration: item.track.duration_ms
            }));

        } catch (error) {
            console.error('Error getting recently played', error);
            throw error;
        }
    }
)

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

export const seekToPosition = createAsyncThunk(
    'player/seekToPosition',
    async (position) => {
        try {
            const accessToken = Spotify.getAccessToken();
            const response = await fetch(`https://api.spotify.com/v1/me/player/seek?position_ms=${position}`, {
                method: 'PUT',
                headers: { Authorization: `Bearer ${accessToken}` }
            });

            if (response.ok) {
                console.log(`DATA SUCCESSFULLY UPDATED, MUSIC SET TO POSITION: ${position}`);
            } else {
                throw new Error(`Failed to seek to position.`)
            }
        } catch (error) {
            console.error("Error seeking to position.", error);
            throw error;
        }
    }
);

export const toggleShuffle = createAsyncThunk(
    'player/toggleShuffle',
    async (state) => {
        try {
            const accessToken = Spotify.getAccessToken();
            const response = await fetch(`https://api.spotify.com/v1/me/player/shuffle?state=${state}`, {
                method: 'PUT',
                headers: { Authorization: `Bearer ${accessToken}` }
            });

            if (response.ok) {
                console.log(`SHUFFLE TOGGLED`);
            } else {
                throw new Error('Failed to toggle shuffle')
            }
        } catch (error) {
            console.error("error toggling shuffle", error);
            throw error;
        }
    }
);

export const setRepeatMode = createAsyncThunk(
    'player/setRepeatMode',
    async (mode) => {
        try {
            const accessToken = Spotify.getAccessToken();
            const response = await fetch(`https://api.spotify.com/v1/me/player/repeat?state=${mode}`, {
                method: 'PUT',
                headers: { Authorization: `Bearer ${accessToken}` }
            });

            if (response.ok) {
                console.log(`Repeat mode set`)
            } else {
                throw new Error('Failed to set repeat mode')
            }
        } catch (error) {
            console.error("error setting repeat mode", error);
            throw error;
        }
    }
)

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
        loadingQueue: false,
        errorQueue: null,
        currentArtist: {},
        loadingCurrentArtist: false,
        errorCurrentArtist: null,
        recentlyPlayed: [],
        loadingRecentlyPlayed: false,
        errorRecentlyPlayed: null
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
        [getQueue.pending]: (state) => {
            state.loadingQueue = true;
            state.errorQueue = null;
        },
        [getQueue.rejected]: (state, action) => {
            state.loadingQueue = false;
            state.errorQueue = action.error.message
        },
        [getQueue.fulfilled]: (state, action) => {
            state.loadingQueue = false;
            state.errorQueue = null;
            state.queue = action.payload;
        },
        [getCurrentArtist.pending]: (state) => {
            state.loadingCurrentArtist = true;
            state.errorCurrentArtist = null;
        },
        [getCurrentArtist.rejected]: (state, action) => {
            state.loadingCurrentArtist = false;
            state.errorCurrentArtist = action.error.message
        },
        [getCurrentArtist.fulfilled]: (state, action) => {
            state.loadingCurrentArtist = false;
            state.errorCurrentArtist = null;
            state.currentArtist = action.payload;
        },
        [getRecentlyPlayed.pending]: (state) => {
            state.loadingRecentlyPlaying = true;
            state.errorRecentlyPlayed = null;
        },
        [getRecentlyPlayed.rejected]: (state, action) => {
            state.loadingRecentlyPlayed = false;
            state.errorRecentlyPlayed = action.error.message;
        },
        [getRecentlyPlayed.fulfilled]: (state, action) => {
            state.loadingRecentlyPlayed = false;
            state.errorRecentlyPlayed = null;
            state.recentlyPlayed = action.payload;
        }
    }
});

export const { updateStatus } = playerSlice.actions;

export const selectCurrentlyPlaying = (state) => state.player.currentlyPlaying;
export const selectLoadingCurrentlyPlaying = (state) => state.player.loadingCurrentlyPlaying;
export const selectErrorCurrentlyPlaying = (state) => state.player.errorCurrentlyPlaying;
export const selectIsPlaying = (state) => state.player.isPlaying;
export const selectQueue = (state) => state.player.queue;
export const selectCurrentArtist = (state) => state.player.currentArtist;
export const selectRecentlyPlayed = (state) => state.player.recentlyPlayed;

export default playerSlice.reducer;