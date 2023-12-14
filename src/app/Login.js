import React from 'react';
import logo from '../logoMaroon.svg';
import './Login.css';

function Login(props) {
    const { handleLogin } = props;
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