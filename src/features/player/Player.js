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
        let timeLeft; // Declare timeLeft variable here
    
        if (currentlyPlaying.track) {
            const trackDuration = currentlyPlaying.timing.duration;
            const progress = currentlyPlaying.timing.progress;
            timeLeft = trackDuration - progress + 1000; // Assign value within the if block
        } else {
            timeLeft = 2000; // Assign value within the else block
        }

        console.log(`Time Left in Track: ${(timeLeft / 1000) / 60} minutes.`)
    
        const intervalId = setInterval(() => {
            dispatch(getCurrentlyPlaying());
        }, timeLeft);

        console.log(`CURRENTLY PLAYING: ${currentlyPlaying}`);
    
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
                <p>Currently Playing</p>
                <img src={currentlyPlaying.track.album.cover} alt="Album Cover" />
                <h4>{currentlyPlaying.track.name}</h4>
                <p className='artist'>{currentlyPlaying.track.artist}</p>
                <p className='album'>{currentlyPlaying.track.album.name}</p>
            </div>
        </div>
    );
}

export default Player;