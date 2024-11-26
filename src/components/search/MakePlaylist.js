import React, { useState, useCallback } from 'react';
import SearchPlaylist from './SearchPlaylist';
import './MakePlaylist.css';
import { useDispatch, useSelector } from 'react-redux';
import Tracklist from '../tracklist/Tracklist';
import { selectAttributes } from '../../features/search/searchSlice';
import { savePlaylist } from '../../features/playlist/playlistSlice';

function MakePlaylist(props) {
    const dispatch = useDispatch();
    const { tempPlaylist, attributeType } = props;
    const attributes = useSelector(selectAttributes);
    
    // State to store the playlist title
    const [playlistTitle, setPlaylistTitle] = useState("");

    // Handle input changes to update playlistTitle state
    const handleTitleChange = useCallback((event) => {
        setPlaylistTitle(event.target.value);
        console.log("INPUT VALUE:", event.target.value); // Log input value for debugging
    }, []);

    // Handle save button click
    const handleSave = () => {
        console.log("Click Save Recieved.")
        console.log("Temp playlist length:", tempPlaylist.length)
        if (tempPlaylist.length > 0) {
            const playlistUris = tempPlaylist.map(track => track.uri);
            console.log("URIs to be saved:", playlistUris);
            dispatch(savePlaylist({ name: playlistTitle, trackUris: playlistUris }));
        }
    };

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
                    onClick={handleSave} // Corrected: now the function is properly referenced
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