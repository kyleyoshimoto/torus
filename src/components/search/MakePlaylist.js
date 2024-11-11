import React from 'react';
import SearchPlaylist from './SearchPlaylist';
import './MakePlaylist.css';

function MakePlaylist() {
    return (
        <div className='make-playlist'>
            <div className='playlist' >
                <h2>Playlist</h2>
                <hr />
            </div>
            <SearchPlaylist />
        </div>
    )
}

export default MakePlaylist;