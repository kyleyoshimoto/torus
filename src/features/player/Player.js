import React, { useCallback, useEffect, useState } from 'react';
import { 
    getCurrentlyPlaying, 
    playPause, 
    skipTrack,
    toggleShuffle,
    setRepeatMode,
    seekToPosition,
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
import ShuffleIcon from '@mui/icons-material/Shuffle';
import ShuffleOnIcon from '@mui/icons-material/ShuffleOn';
import RepeatIcon from '@mui/icons-material/Repeat';
import RepeatOnIcon from '@mui/icons-material/RepeatOn';
import RepeatOneOnIcon from '@mui/icons-material/RepeatOneOn';
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';

function Player() {
    const [initialRender, setInitialRender] = useState(true);
    const [currentSong, setCurrentSong] = useState("");
    const [progress, setProgress] = useState(0);
    const [progressMin, setProgressMin] = useState(0);
    const [progressSec, setProgressSec] = useState(0);
    const [finished, setFinished] = useState(true);
    const [duration, setDuration] = useState(1);
    const [seeking, setSeeking] = useState(false);
    const [pendingSeek, setPendingSeek] = useState(0);
    const [shuffleState, setShuffleState] = useState(false);
    const [repeatMode, setRepeatMode] = useState(0)
    const [volume, setVolume] = useState(25);
    const [pendingVolume, setPendingVolume] = useState(null);

    const dispatch = useDispatch();
    const currentlyPlaying = useSelector(selectCurrentlyPlaying);
    const loadingPlayer = useSelector(selectLoadingCurrentlyPlaying);
    const errorPlayer = useSelector(selectErrorCurrentlyPlaying);
    const isPlaying = useSelector(selectIsPlaying);

    // Dispatch currently playing function
    useEffect(() => {
        let timeLeft;

        if (initialRender) {
            dispatch(getCurrentlyPlaying());
            setInitialRender(false);
        }
    
        if (currentlyPlaying.track && currentlyPlaying.timing.isPlaying) {
            timeLeft = 3500; // Assign value within the if block
        } else {
            timeLeft = 8000; // Assign value within the else block
        }
    
        const intervalId = setInterval(() => {
            dispatch(getCurrentlyPlaying());
        }, timeLeft);
    
        return () => clearInterval(intervalId);
    }, [dispatch]);

    // Song timer function
    useEffect(() => {
        setDuration(currentlyPlaying?.timing?.duration);
    
        if (finished && currentlyPlaying.track) {
            setProgress(currentlyPlaying?.timing?.progress + 1000);
            setCurrentSong(currentlyPlaying?.track?.name);
            setFinished(false);
        }
    
        if (currentSong !== currentlyPlaying?.track?.name) {
            setProgress(currentlyPlaying?.timing?.progress);
            setCurrentSong(currentlyPlaying?.track?.name);
        }
    
        let intervalId;
        let thirtySecondsIntervalId;
    
        if (isPlaying && !finished) {
            intervalId = setInterval(() => {
                if (progress + 500 >= duration || seeking) {
                    setProgress(currentlyPlaying.timing.progress);
                    setFinished(true);
                    clearInterval(intervalId);
                    clearInterval(thirtySecondsIntervalId);
                    return;
                }
    
                // Calculate updated progress and time
                const updatedProgress = progress + 1000;
                const updatedSeconds = Math.floor((updatedProgress % 60000) / 1000);
                const updatedMinutes = Math.floor(updatedProgress / 60000);
    
                setProgress(updatedProgress);
                setProgressSec(updatedSeconds);
                setProgressMin(updatedMinutes);
            }, 900);
    
            // Additional update every 15 seconds
            thirtySecondsIntervalId = setInterval(() => {
                setProgress(currentlyPlaying.timing.progress);
                console.log('Updating progress every 15 seconds...');
            }, 15000);
    
            // Clean up the additional 30 seconds interval
            return () => {
                clearInterval(intervalId);
                clearInterval(thirtySecondsIntervalId);
            };
        };
    
        // Clean up the interval when component unmounts or when isPlaying changes to false
        return () => {
            clearInterval(intervalId);
            clearInterval(thirtySecondsIntervalId);
        };
    }, [currentlyPlaying, isPlaying, duration, finished, progress, currentSong, seeking]);

    // Seek to Position
    useEffect(() => {
        let timeoutId;

        if (pendingSeek !== 0) {
            timeoutId = setTimeout(() => {
                dispatch(seekToPosition(pendingSeek));
                setProgress(pendingSeek);
                setPendingSeek(0);
                console.log(`Seeking to position ${pendingSeek}`);
                setSeeking(false);
            }, 500);
        }

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [dispatch, pendingSeek]);
    
    // Volume adjuster function
    useEffect(() => {
        let timeoutId;

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
    }, [dispatch, volume]);

    const handleVolumeChange = (event, newValue) => {
        setVolume(newValue);
        setPendingVolume(newValue);
    };

    const handlePause = useCallback(
        (event) => {
            dispatch(playPause('pause'));
            dispatch(updateStatus(false));
        }, 
        []
    );

    const handlePlay = useCallback(
        (event) => {
            dispatch(playPause('play'));
            dispatch(updateStatus(true));
        },
        []
    );

    const handleSkipNext = useCallback(
        (event) => {
            dispatch(skipTrack('next'));
            dispatch(getCurrentlyPlaying);
        },
        []
    );

    const handleSkipPrevious = useCallback(
        (event) => {
            dispatch(skipTrack('previous'));
            dispatch(getCurrentlyPlaying);
        },
        []
    );

    const handleSeekToPosition = useCallback(
        (event) => {
            const newValue = event.target.value;
            setSeeking(true);
            setProgress(newValue);
            setFinished(false);
            setPendingSeek(newValue);
        },
        []
    );

    const handleShuffle = useCallback(
        () => {
            if (shuffleState) {
                setShuffleState(false);
                dispatch(toggleShuffle(false));
                console.log(shuffleState);
            } else {
                setShuffleState(true);
                dispatch(toggleShuffle(true));
                console.log(shuffleState);
            }
        },
        [shuffleState]
    );

    const handleRepeat = useCallback(
        () => {
            if (repeatMode === 0) {
                dispatch(setRepeatMode('off'));
                setRepeatMode(1);
            } else if (repeatMode === 1) {
                dispatch(setRepeatMode('context'));
                setRepeatMode(2);
            } else {
                dispatch(setRepeatMode('track'));
                setRepeatMode(0);
            }
        }
    )

    const renderRepeat = () => {
        if (repeatMode === 1) {
            return (<RepeatOnIcon className='repeat pointer' onClick={handleRepeat} />)
        } else if (repeatMode === 2) {
            return (<RepeatOneOnIcon className='repeat pointer' onClick={handleRepeat} />)
        } else if (repeatMode === 0) {
            return (<RepeatIcon className='repeat pointer' onClick={handleRepeat} />)
        }
    };

    const renderShuffle = () => {
        if (shuffleState) {
            return <ShuffleOnIcon className='shuffle pointer' onClick={handleShuffle} />
        } else {
            return <ShuffleIcon className='shuffle pointer' onClick={handleShuffle} />
        }
    };

    if (!currentlyPlaying.track) {
        return (
            <div className='player'>
                <div className='track-container'>
                <div className='playing-from'>
                    <p>Play music from Spotify™ with premium</p>
                </div>
                <a href='https://open.spotify.com/?' target='_blank'>
                    <img src={spotifyLogo} alt="Album Cover" className='album-cover'/>
                </a>
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
            <div className='playing-from'>
                <b>Currently Playing: </b>
                <p><SpeakerIcon fontSize='small'/>{currentlyPlaying.device.name}</p>
            </div>
            <div className='track-container'>
                <img src={currentlyPlaying.track.album.cover[0].url} alt="Album Cover" />
                <h4>{currentlyPlaying.track.name}</h4>
                <p className='artist'>{currentlyPlaying.track.artist}</p>
                <p className='album'>{currentlyPlaying.track.album.name}</p>
            </div>
            <div className='timer'>
                <p id="start-time">{progressMin}:{String(progressSec).padStart(2, "0")}</p>
                <p id="end-time">{Math.floor(duration / 60000)}:{String(Math.floor((duration % 60000) / 1000)).padStart(2,"0")}</p>
                <input 
                    type="range" 
                    value={progress} 
                    min="0" 
                    max={duration} 
                    id="progress"
                />
                {/*<input
                    type="range"
                    className='timer-bar'
                    id="timer-bar"
                    min="0"
                    max={duration}
                    onMouseUp={handleSeekToPosition}
                />*/}
            </div>
            <div className='player-controls'>
                <div className='pause-play'>
                    {renderRepeat()}
                    <SkipPreviousIcon onClick={handleSkipPrevious} fontSize="large" className='pointer'/>
                    {isPlaying ? <PauseIcon onClick={handlePause} fontSize="large" className='pointer'/> : <PlayArrowIcon onClick={handlePlay} fontSize="large" className='pointer'/>}
                    <SkipNextIcon onClick={handleSkipNext} fontSize="large" className='pointer'/>
                    {renderShuffle()}
                </div>  
                {currentlyPlaying.device.name === "iPhone"
                    ?
                <></>
                    :
                <div className='volume'>
                    <VolumeDown className='volumeIcon'/>
                    <Slider                         
                        size="small" 
                        aria-label="Volume" 
                        value={volume} 
                        onChange={handleVolumeChange}
                        defaultValue={volume}
                        min={0}
                        max={100}
                        step={1}
                        className='pointer'
                    />
                    <VolumeUp className='volumeIcon'/>
                </div>
                }
            </div>
        </div>
    );
}

export default Player;