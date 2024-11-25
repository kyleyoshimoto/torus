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
    const [selectedPlaylistName, selectPlaylistName] = useState(null);
    const dispatch = useDispatch();
    const playlists = useSelector(selectPlaylists);
    const playlistItems = useSelector(selectPlaylistItems);

    useEffect(() => {
        dispatch(getUserPlaylists());
    }, []);

    const onSelection = useCallback(
        (id, name) => {
            selectPlaylist(id);
            selectPlaylistName(name);
            dispatch(getPlaylistItems(id));
            console.log("Dispatching getPlaylistItems...");
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
                <div className='playlist-list'>
                    <header>
                        <h2>{selectedPlaylistName}</h2>
                        <CloseIcon onClick={onExit}/>
                    </header>
                    <hr />
                    <Tracklist 
                        tracks={playlistItems}
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
                            uri={playlist.uri}
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

    const renderAnalysis = () => {
        if (selectedPlaylist) {
            return (<PlaylistAnalysis
                        trackList={playlistItems}
                    />)
        } else {
            return ( <h1 className='analysisPlaceholder'>Select a Playlist to Analyze...</h1> )
        }
    }

    return(
        <div className='playlists-page'>
            <User title="Your Playlists"/>
            {renderPlaylists()}
            {renderAnalysis()}
        </div>
    )
}

export default Playlists;