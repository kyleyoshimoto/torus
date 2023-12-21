import React, { useEffect } from 'react';
import { getCurrentlyPlaying, selectCurrentlyPlaying, selectLoadingCurrentlyPlaying, selectErrorCurrentlyPlaying } from './playerSlice';
import './Player.css';
import { useDispatch, useSelector } from 'react-redux';

function Player() {
    const dispatch = useDispatch();
    const currentlyPlaying = useSelector(selectCurrentlyPlaying);
    const loadingPlayer = useSelector(selectLoadingCurrentlyPlaying);
    const errorPlayer = useSelector(selectErrorCurrentlyPlaying);

    useEffect(() => {
        dispatch(getCurrentlyPlaying);
        const intervalId = setInterval(() => {
            dispatch(getCurrentlyPlaying());
        }, 10000);

        return () => clearInterval(intervalId);
    }, [dispatch, currentlyPlaying]);

    if (!currentlyPlaying.track) {
        return (
            <div className='player'>
                <p>Loading...</p>
            </div>
        )
    }

    return (
        <div className='player'>
            <div className='track-container'>
                <img src={currentlyPlaying.track.album.cover} alt="Album Cover" />
            </div>
        </div>
    );
}

export default Player;