import React from 'react';
import User from '../profile/User';
import PlaylistAnalysis from './PlaylistAnalysis';
import './Playlists.css';

function Playlists() {
    return(
        <div className='playlists-page'>
            <User title="Your Playlists"/>
            <div className='playlist-list'>
                <h2>Playlists</h2>
                <hr />
            </div>
            <PlaylistAnalysis />
        </div>
    )
}

export default Playlists;