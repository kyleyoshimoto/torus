import React from 'react';
import PlaylistAnalysis from './PlaylistAnalysis';
import './MakePlaylist.css';

function MakePlaylist() {
    return (
        <div className='make-playlist'>
            <PlaylistAnalysis />
            <div className='playlist' >
                <h2>Playlist</h2>
                <hr />
            </div>
        </div>
    )
}

export default MakePlaylist;