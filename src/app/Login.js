import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Spotify from './spotify';
import logo from '../logo.svg';
import './Login.css';
import { addAccessToken } from './spotifySlice';

function Login() {
    const dispatch = useDispatch();

    const handleLogin = useCallback(() => {
        dispatch(addAccessToken(Spotify.getAccessToken()));
    }, []);

    return (
        <div className="login">
            <div className="login-header">
                <img src={logo} className="App-logo" alt="logo" />
                <div className="title" alt="title">
                    <h1>Torus</h1>
                    <p>Explore Spotify's music catalog, view track statistics, create playlists, and discover profile summaries for an immersive music experience.</p>
                </div>
            </div>
            <p className="login-button" onClick={handleLogin}>LOGIN WITH SPOTIFY</p>
        </div>
    )
};

export default Login;