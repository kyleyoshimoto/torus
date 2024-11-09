import React, { useEffect, useState } from 'react';
import { selectTopTracks, selectTopArtists } from '../../features/spotify/spotifySlice';
import { useDispatch, useSelector } from 'react-redux';
import Top from './Top';
import './Home.css';
import { getQueue, getRecentlyPlayed, selectCurrentlyPlaying, selectRecentlyPlayed } from '../../features/player/playerSlice';
import Tracklist from '../tracklist/Tracklist';
import { getAttributes, selectAttributes } from '../../features/search/searchSlice';
import RadarChart from '../radarchart/radarChart';

function Home() {
    const dispatch = useDispatch();

    // Define state for attribute means
    const [attributeMeans, setAttributeMeans] = useState(null);

    // Fetch user's top tracks and top artists from the Redux store
    const topTracks = useSelector(selectTopTracks);
    const topArtists = useSelector(selectTopArtists);

    // Fetch the list of recently played tracks from the Redux store
    const recentlyPlayed = useSelector(selectRecentlyPlayed);

    // Fetch audio feature attributes of recently played tracks from the Redux store
    const recentAttributes = useSelector(selectAttributes);
    
    // Get the currently playing track info from the Redux store
    const currentlyPlaying = useSelector(selectCurrentlyPlaying);

    // State to track how often the queue retrieval is triggered
    const [triggerCount, setTriggerCount] = useState(0);

    // Define time interval of one week in milliseconds
    const oneWeek = 7 * 24 * 60 * 60 * 1000;
    const currentTime = new Date().getTime();
    const oneWeekBefore = currentTime - oneWeek;

    // Fetch recently played tracks within the last week
    useEffect(() => {
        dispatch(getRecentlyPlayed(oneWeekBefore));
        console.log('Recently Played:', recentlyPlayed);
    }, []);

    // Fetch audio feature attributes for recently played tracks whenever the track list updates
    useEffect(() => {
        const recentIdsString = recentlyPlayed
            ? recentlyPlayed.map(item => item.id).join(',')
            : '';  // Use an empty string if data isn’t ready
        dispatch(getAttributes(recentIdsString));
        console.log('Recently Played Attributes:', recentIdsString);
    }, [recentlyPlayed, dispatch]);

    // Aggregate recentAttributes to calculate the mean of each audio feature
    useEffect(() => {
        if (recentAttributes && Object.keys(recentAttributes).length > 0) {
            const featureSums = {};
            const count = Object.keys(recentAttributes).length;

            // Sum values for each audio feature across all tracks
            Object.values(recentAttributes).forEach(feature => {
                Object.keys(feature).forEach(key => {
                    featureSums[key] = (featureSums[key] || 0) + feature[key];
                });
            });

            // Calculate the mean for each audio feature and store in state
            const featureMeans = {};
            Object.keys(featureSums).forEach(key => {
                featureMeans[key] = featureSums[key] / count;
            });
            console.log('Calculated Attribute Means:', featureMeans);
            setAttributeMeans(featureMeans);
        }
    }, [recentAttributes]);

    // Fetch queue periodically when triggerCount is a multiple of 3
    useEffect(() => {
        if (triggerCount % 3 === 0) {
            dispatch(getQueue());
            console.log("Getting Queue...");
        }
        setTriggerCount(prevCount => prevCount + 1);
    }, [currentlyPlaying]);

    return (
        <div className="home">
            {/* Render top songs and top artists */}
            <div className='header'>
                <Top className="top-songs" subject="Songs" items={topTracks} />
                <Top className="top-artists" subject="Artists" items={topArtists} />
            </div>

            {/* Render recently played tracks */}
            <div className='recently-played'>
                <h3>Recently Played</h3>
                <hr />
                <Tracklist tracks={recentlyPlayed} list={false} />
            </div>

            {/* Section for displaying listening mood or attributes (to be expanded as needed) */}
            <div className='listening-mood'>
                <h3>Listening Behavior</h3>
                <hr />
            </div>
        </div>
    )
}

export default Home;