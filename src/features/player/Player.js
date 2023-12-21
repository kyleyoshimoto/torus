import React, { useCallback, useEffect, useState } from 'react';
import { getCurrentlyPlaying, pause, updateStatus, selectIsPlaying, selectCurrentlyPlaying, selectLoadingCurrentlyPlaying, selectErrorCurrentlyPlaying } from './playerSlice';
import './Player.css';
import { useDispatch, useSelector } from 'react-redux';

import SpeakerIcon from '@mui/icons-material/Speaker';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';


function Player() {
    const [volume, setVolume] = useState(0);

    const dispatch = useDispatch();
    const currentlyPlaying = useSelector(selectCurrentlyPlaying);
    const loadingPlayer = useSelector(selectLoadingCurrentlyPlaying);
    const errorPlayer = useSelector(selectErrorCurrentlyPlaying);
    const isPlaying = useSelector(selectIsPlaying);

    useEffect(() => {
        let timeLeft; // Declare timeLeft variable here
    
        if (currentlyPlaying.track) {
            const trackDuration = currentlyPlaying.timing.duration;
            const progress = currentlyPlaying.timing.progress;
            timeLeft = trackDuration - progress + 1000; // Assign value within the if block
        } else {
            timeLeft = 3000; // Assign value within the else block
        }

        console.log(`Time Left in Track: ${(timeLeft / 1000) / 60} minutes.`)
    
        const intervalId = setInterval(() => {
            dispatch(getCurrentlyPlaying());
        }, timeLeft);
    
        return () => clearInterval(intervalId);
    }, [dispatch]);

    useEffect(() => {
        if (currentlyPlaying.timing && typeof currentlyPlaying.timing.isPlaying !== 'undefined') {
            dispatch(updateStatus(currentlyPlaying.timing.isPlaying));
        } else {console.log('NO CURRENTLY PLAYING INFO')}
    }, [dispatch])

    const handleVolumeChange = (event, newValue) => {
        setVolume(newValue);
    };

    const handlePause = useCallback(
        (event) => {
            dispatch(pause());
        }, 
        []
    );

    if (!currentlyPlaying.track) {
        return (
            <div className='player'>
                <p className='loading'>Loading...</p>
            </div>
        )
    }

    return (
        <div className='player'>
            <div className='track-container'>
                <p>Currently Playing</p>
                <div className='playing-from'>
                    <SpeakerIcon />
                    <p>{currentlyPlaying.device.name}</p>
                </div>
                <img src={currentlyPlaying.track.album.cover} alt="Album Cover" />
                <h4>{currentlyPlaying.track.name}</h4>
                <p className='artist'>{currentlyPlaying.track.artist}</p>
                <p className='album'>{currentlyPlaying.track.album.name}</p>
            </div>
            <div className='player-controls'>
                <div className='pause-play'>
                    <SkipPreviousIcon fontSize="large"/>
                    {isPlaying ? <PauseIcon onClick={handlePause} fontSize="large"/> : <PlayArrowIcon fontSize="large" />}
                    <SkipNextIcon fontSize="large"/>
                </div>
                <div className='volume'>
                    <VolumeDown className='volumeIcon'/>
                    <Slider 
                        size="small" 
                        aria-label="Volume" 
                        value={volume} 
                        onChange={handleVolumeChange}
                        defaultValue={currentlyPlaying.device.volume}
                        min={0}
                        max={100}
                        step={1}
                    />
                    <VolumeUp className='volumeIcon'/>
                </div>
            </div>
        </div>
    );
}

export default Player;