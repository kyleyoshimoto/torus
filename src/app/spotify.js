import { clientId } from "../secret";
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAccessToken } from "./spotifySlice";

// https://developer.spotify.com/documentation/web-playback-sdk/quick-start/#
export const authEndpoint = "https://accounts.spotify.com/authroize";
// Replace with your app's client ID, redirect URI and desired scopes
//const clientId = '#';
const redirectUri = "http://localhost:3000";
const scopes = [
    "user-top-read",
    "playlist-read-private",
    "playlist-read-collaborative",
    "playlist-modify-public",
    "playlist-modify-private",
    "user-library-read",
    "user-library-modify",
    "user-read-email"
];
let accessToken;

const Spotify = {
    getAccessToken(access) {
        if (access) {
            return access;
        }
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=${scopes.join("%20")}&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
        }
    }
}

export default Spotify;