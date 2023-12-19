import React from 'react';
import './Player.css';

function Player() {
    return (
        <div className='player'>
            <p>Player</p>
            <p>API calls to host:</p>
            <p>Get Currently Playing Track</p>
            <p>Get Playback State</p>
            <p>Start/Resume Playback</p>
            <p>Skip To Next/Previous</p>
            <p>Seek to Position</p>
            <p>Set Repeat Mode</p>
            <p>Set Playback volume</p>
            <p>Toggle Playback Shuffle</p>
        </div>
    )
}

export default Player;