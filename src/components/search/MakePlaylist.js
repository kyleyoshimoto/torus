import React, { useState, useCallback } from 'react';
import SearchPlaylist from './SearchPlaylist';
import './MakePlaylist.css';
import { useDispatch, useSelector } from 'react-redux';
import Tracklist from '../tracklist/Tracklist';
import { selectAttributes } from '../../features/search/searchSlice';

function MakePlaylist(props) {
    const dispatch = useDispatch();
    const { tempPlaylist, attributeType } = props;
    const attributes = useSelector(selectAttributes);
    
    // State to store the playlist title
    const [playlistTitle, setPlaylistTitle] = useState("");

    // Handle input changes to update playlistTitle state
    const handleTitleChange = useCallback((event) => {
        // Update the playlistTitle state as the user types
        setPlaylistTitle(event.target.value);
        console.log("INPUT VALUE:", event.target.value); // Log input value for debugging
    }, []);

    const handleSave = (() => {
        dispatch()
    })

    return (
        <div className='make-playlist'>
            <div className='playlist-title'>
                <input 
                    type="text"
                    placeholder='Enter Playlist Title'
                    value={playlistTitle} // Bind the input value to playlistTitle
                    onChange={handleTitleChange} // Call handleTitleChange on input change
                />
                <button 
                    className='playlist-save'
                    onClick={handleSave}
                >
                    Save to Spotify™
                </button>
            </div>
            <div className='playlist'>
                <Tracklist
                    tracks={tempPlaylist}
                    attributes={attributes}
                    attributeType={attributeType}
                />
            </div>
            <SearchPlaylist />
        </div>
    );
}

export default MakePlaylist;