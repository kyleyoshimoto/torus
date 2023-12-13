import React from 'react';
import logo from '../logo.svg';
import './Login.css';

function Login() {
    return (
        <div className="login">
            <div className="login-header">
                <img src={logo} className="App-logo" alt="logo" />
                <div className="title">
                    <h1>Torus</h1>
                    <p>Explore Spotify's music catalog, view track statistics, create playlists, and discover profile summaries for an immersive music experience.</p>
                </div>
            </div>
            <a href="#">LOGIN WITH SPOTIFY</a>
        </div>
    )
}

export default Login;