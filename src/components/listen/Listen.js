import React, { useEffect } from 'react';
import './Listen.css';
import { useDispatch, useSelector } from 'react-redux';
import { getQueue, selectCurrentlyPlaying, selectQueue } from '../../features/player/playerSlice';
import Tracklist from '../tracklist/Tracklist';
import { selectTopTracks } from '../../features/spotify/spotifySlice';

function Listen() {
    const dispatch = useDispatch();
    const currentlyPlaying = useSelector(selectCurrentlyPlaying);
    const topSong = useSelector(selectTopTracks);
    const queue = useSelector(selectQueue);

    useEffect(() => {
        dispatch(getQueue());
        console.log("QUEUE")
        console.log(queue);
    }, [currentlyPlaying]);

    const renderSpotlight = () => {
        if (currentlyPlaying) {
            return (
                <div className='song-info'>
                    <h2>Playing</h2>
                    <img src={currentlyPlaying.track.album.cover[0].url} />
                    <div className='song-details'>
                        <h3>{currentlyPlaying.track.name}</h3>
                        <h4>{currentlyPlaying.track.artist}</h4>
                        <h5>{currentlyPlaying.track.album.name}</h5>
                    </div>
                </div>
            )
        } else {
            return (
                <div className='song-info'>
                    <h2>Top Song</h2>
                    <img src={topSong[0]?.album.cover} />
                    <div className='song-details'>
                        <h3>{topSong[0]?.name}</h3>
                        <h4>{topSong[0]?.artist}</h4>
                        <h5>{topSong[0]?.album.name}</h5>
                    </div>
                </div>
            )
        }
    } 

    const renderBreakdown = () => {
        if (currentlyPlaying) {
            return (
                <div className='breakdown'>
                    <div className='artist-breakdown'>
                        <img src={currentlyPlaying.track.album.cover[0].url} />
                        <div className='artist-details'>
                            <h3>Replace with artist name & img</h3>
                            <p>Replace with artist details. Genre. Release date.</p>
                        </div>
                    </div>
                    <hr />
                    <div className='track-breakdown'>
                        <p>Replace with track analysis.</p>
                    </div>
                </div>
            )
        } else {
            return (
                <></>
            )
        }
    }

    return (
        <div className='listen'>
            <h2>Listen</h2>
            {renderSpotlight()}
            <div className='radar-graph'>
                <p>Radar-Graph</p>
            </div>
            <div className='queue'>
                <h3>Queue</h3>
                <hr />
                {currentlyPlaying ?
                <Tracklist
                    tracks={queue}
                    list={true}
                />
                :
                <p>Play music with spotify premium.</p>
                }
            </div>
            {renderBreakdown()}
        </div>
    )
}

export default Listen;