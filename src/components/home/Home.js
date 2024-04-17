import React, { useEffect, useState } from 'react';
import { selectTopTracks, selectTopArtists } from '../../features/spotify/spotifySlice';
import { useDispatch, useSelector } from 'react-redux';
import Top from './Top';
import './Home.css';
import { getQueue, getRecentlyPlayed, selectCurrentlyPlaying, selectRecentlyPlayed } from '../../features/player/playerSlice';
import Tracklist from '../tracklist/Tracklist';

function Home() {
    const dispatch = useDispatch()
    const topTracks = useSelector(selectTopTracks);
    const topArtists = useSelector(selectTopArtists);
    const recentlyPlayed = useSelector(selectRecentlyPlayed);
    const currentlyPlaying = useSelector(selectCurrentlyPlaying);
    const [triggerCount, setTriggerCount] = useState(0);

    const oneWeek = 7 * 24 * 60 * 60 * 1000;
    const currentTime = new Date().getTime();
    const oneWeekBefore = currentTime - oneWeek;

    useEffect(() => {
        dispatch(getRecentlyPlayed(oneWeekBefore));
        console.log('Recently Played:', recentlyPlayed);
    }, []);

    useEffect(() => {
        if (triggerCount % 3 === 0) {
            dispatch(getQueue());
            console.log("Getting Queue...")
        }
        setTriggerCount(prevCount => prevCount + 1);
    }, [currentlyPlaying]);

    return (
        <div className="home">

            <div className='header'>
                <Top className="top-songs" subject="Songs" items={topTracks} />
                <Top className="top-artists" subject="Artists" items={topArtists} />
            </div>
            <div className='recently-played'>
                <h3>Recently Played</h3>
                <hr />
                <Tracklist 
                    tracks={recentlyPlayed}
                    list={false}
                />
            </div>
            <div className='listening-mood'>
                <h3>Listening Behavior</h3>
                <hr />
            </div>
        </div>
    )
}

export default Home;