import React, { useEffect } from 'react';
import './Listen.css';
import { useDispatch, useSelector } from 'react-redux';
import { getQueue, selectCurrentlyPlaying, selectQueue } from '../../features/player/playerSlice';
import Tracklist from '../tracklist/Tracklist';

function Listen() {
    const dispatch = useDispatch();
    const currentlyPlaying = useSelector(selectCurrentlyPlaying);
    const queue = useSelector(selectQueue);

    useEffect(() => {
        dispatch(getQueue());
        console.log("QUEUE")
        console.log(queue);
    }, [currentlyPlaying]);

    return (
        <div className='listen'>
            <h2>Listen</h2>
            <div className='song-info'>
                <img src={currentlyPlaying.track.album.cover[0].url} />
                <div className='song-details'>
                    <h3>{currentlyPlaying.track.name}</h3>
                    <h4>{currentlyPlaying.track.artist}</h4>
                    <h5>{currentlyPlaying.track.album.name}</h5>
                </div>
                <div className='radar-graph'><p>radar-graph</p></div>
            </div>
            <div className='queue'>
                <p>queue</p>
                <hr />
                <Tracklist
                    tracks={queue}
                    list={false}
                />
            </div>
        </div>
    )
}

export default Listen;