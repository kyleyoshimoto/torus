import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserPlaylists, getPlaylistItems, selectPlaylists, selectPlaylistItems } from '../../features/spotify/spotifySlice';

import User from '../profile/User';
import PlaylistAnalysis from './PlaylistAnalysis';
import Playlist from './Playlist';
import Tracklist from '../tracklist/Tracklist';

import './Playlists.css';
import CloseIcon from '@mui/icons-material/Close';

function Playlists() {
    const [selectedPlaylist, selectPlaylist] = useState(null);
    const dispatch = useDispatch();
    const playlists = useSelector(selectPlaylists);
    const playlistItems = useSelector(selectPlaylistItems);

    useEffect(() => {
        dispatch(getUserPlaylists());
    }, []);

    const onSelection = useCallback(
        (id) => {
            selectPlaylist(id);
            dispatch(getPlaylistItems);
        }, [selectedPlaylist]
    );

    const onExit = useCallback(
        () => {
            selectPlaylist(null);
        }, [selectPlaylists]
    );

    const renderPlaylists = () => {
        if (selectedPlaylist) {
            return (
                <div className='playlists-list'>
                    <header>
                        <h2>{selectedPlaylist.name}</h2>
                        <CloseIcon onClick={onExit}/>
                    </header>
                    <hr />
                    <Tracklist 
                    />
                </div>
            )
        } else {
            return (
                <div className='playlist-list'>
                    <h2>Playlists</h2>
                    <hr />
                    {playlists.map((playlist) => {
                    return (
                        <Playlist
                            name={playlist.name}
                            img={playlist.img}
                            total={playlist.total}
                            id={playlist.id}
                            onSelection={onSelection}
                        />
                    )
                })}
                </div>
            )
        }
    }

    return(
        <div className='playlists-page'>
            <User title="Your Playlists"/>
            {renderPlaylists()}
            <PlaylistAnalysis />
        </div>
    )
}

export default Playlists;