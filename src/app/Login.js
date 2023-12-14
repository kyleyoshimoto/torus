import React, { useCallback } from 'react';
import Spotify, { accessUrl } from './spotify';
import logo from '../logo.svg';
import './Login.css';

function Login() {
    const handleLogin = useCallback(() => {
        return Spotify.getAccessToken()
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