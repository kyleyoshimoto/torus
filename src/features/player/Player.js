import React, { useCallback, useEffect, useState } from 'react';
import { 
    getCurrentlyPlaying, 
    play, 
    pause, 
    changeVolume, 
    updateStatus, 
    selectIsPlaying, 
    selectCurrentlyPlaying, 
    selectLoadingCurrentlyPlaying, 
    selectErrorCurrentlyPlaying 
    } from './playerSlice';
import './Player.css';
import { useDispatch, useSelector } from 'react-redux';

import spotifyLogo from '../../logos/spotify.svg'
import SpeakerIcon from '@mui/icons-material/Speaker';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';

function Player() {
    const [initialRender, setInitialRender] = useState(true);
    const [volume, setVolume] = useState(25);
    const [pendingVolume, setPendingVolume] = useState(null);

    const dispatch = useDispatch();
    const currentlyPlaying = useSelector(selectCurrentlyPlaying);
    const loadingPlayer = useSelector(selectLoadingCurrentlyPlaying);
    const errorPlayer = useSelector(selectErrorCurrentlyPlaying);
    const isPlaying = useSelector(selectIsPlaying);

    useEffect(() => {
        let timeLeft; // Declare timeLeft variable here

        if (initialRender) {
            dispatch(getCurrentlyPlaying());
            setInitialRender(false);
        }
    
        if (currentlyPlaying.track && currentlyPlaying.timing.isPlaying) {
            timeLeft = 3500; // Assign value within the if block
        } else {
            timeLeft = 10000; // Assign value within the else block
        }

        console.log(`Time Left in Track: ${(timeLeft / 1000) / 60} minutes.`)
    
        const intervalId = setInterval(() => {
            dispatch(getCurrentlyPlaying());
        }, timeLeft);
    
        return () => clearInterval(intervalId);
    }, [dispatch]);

    useEffect(() => {
        let timeoutId;
        
        if (currentlyPlaying.timing && typeof currentlyPlaying.timing.isPlaying !== 'undefined') {
            dispatch(updateStatus(currentlyPlaying.timing.isPlaying));
        } else {console.log('NO CURRENTLY PLAYING INFO')};

        if (pendingVolume !== null) {
            timeoutId = setTimeout(() => {
                setVolume(pendingVolume);
                setPendingVolume(null);
                dispatch(changeVolume(pendingVolume));
                console.log(`Changed volume to: ${pendingVolume}%`);
            }, 1000);
        }

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        }
    }, [dispatch, volume])

    const handleVolumeChange = (event, newValue) => {
        setVolume(newValue);
        setPendingVolume(newValue);
    };

    const handlePause = useCallback(
        (event) => {
            dispatch(pause());
            dispatch(getCurrentlyPlaying());
        }, 
        []
    );

    const handlePlay = useCallback(
        (event) => {
            dispatch(play());
            dispatch(getCurrentlyPlaying());
        },
        []
    );

    if (!currentlyPlaying.track && loadingPlayer) {
        return (
            <div className='player'>
                <p className='loading'>Loading...</p>
            </div>
        )
    };

    if (!currentlyPlaying.track) {
        return (
            <div className='player'>
                <div className='track-container'>
                <div className='playing-from'>
                    <p>Play music from Spotify™</p>
                </div>
                <img src={spotifyLogo} alt="Album Cover" />
                <h4>...</h4>
            </div>
            <div className='timer'>
                <Slider
                    size="small"
                />
            </div>
            <div className='player-controls'>
                <div className='pause-play'>
                    <SkipPreviousIcon fontSize="large"/>
                    <PlayArrowIcon onClick={handlePlay} fontSize="large" />
                    <SkipNextIcon fontSize="large"/>
                </div>
                <div className='volume'>
                    <VolumeDown className='volumeIcon'/>
                    <Slider 
                        size="small" 
                        aria-label="Volume" 
                        value={volume} 
                        defaultValue={0}
                        min={0}
                        max={100}
                        step={1}
                    />
                    <VolumeUp className='volumeIcon'/>
                </div>
            </div>
            </div>
        )
    }

    return (
        <div className='player'>
            <div className='track-container'>
                <div className='playing-from'>
                    <SpeakerIcon fontSize='small'/>
                    <p>{currentlyPlaying.device.name}</p>
                </div>
                <img src={currentlyPlaying.track.album.cover} alt="Album Cover" />
                <h4>{currentlyPlaying.track.name}</h4>
                <p className='artist'>{currentlyPlaying.track.artist}</p>
                <p className='album'>{currentlyPlaying.track.album.name}</p>
            </div>
            <div className='timer'>
                <Slider
                    size="small"
                />
            </div>
            <div className='player-controls'>
                <div className='pause-play'>
                    <SkipPreviousIcon fontSize="large"/>
                    {isPlaying ? <PauseIcon onClick={handlePause} fontSize="large"/> : <PlayArrowIcon onClick={handlePlay} fontSize="large" />}
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