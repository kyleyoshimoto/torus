// Import necessary React hooks and components
import React, { useEffect, useState } from 'react'; // React core functionality
import User from './User'; // Component to display user details
import Tracklist from '../tracklist/Tracklist'; // Component to render a list of tracks
import ProfileAnalysis from './ProfileAnalysis'; // Component for analyzing and displaying profile data
import { selectDisplayName, selectTopTracks } from '../../features/spotify/spotifySlice'; // Redux selectors for Spotify data
import './Profile.css'; // CSS for styling the Profile component
import { useDispatch, useSelector } from 'react-redux'; // Hook to access Redux state
import { getAttributes, selectAttributes } from '../../features/search/searchSlice'; // Selector for additional track attributes

function Profile() {
    const dispatch = useDispatch()
    // Fetch user display name, top tracks, and profile attributes from Redux state
    const displayName = useSelector(selectDisplayName);
    const topTracks = useSelector(selectTopTracks);
    const profileAttributes = useSelector(selectAttributes);

    // State to store calculated mean values of audio features
    const [attributeMeans, setAttributeMeans] = useState("");

    // Effect to fetch attributes for top tracks whenever topTracks changes
    useEffect(() => {
        // Combine top track IDs into a single string for API calls
        const topTrackIds = Array.isArray(topTracks)
            ? topTracks
            .filter(item => item && item.id) // Ensure `item` exists and has an `id`
            .map(item => item.id)
            .join(',')
            : null;

        // Dispatch an event to fetch audio attributes for the selected tracks
        if (topTrackIds) {
            dispatch(getAttributes(topTrackIds));
            console.log('Top Tracks Attributes:', topTrackIds);
        };
    }, [topTracks, dispatch]); // Dependencies: topTracks and dispatch function

    // Effect to calculate mean values of audio features for top tracks
    useEffect(() => {
        if (profileAttributes && Object.keys(profileAttributes).length > 0) {
            const featureSums = {}; // Object to hold cumulative sums for each feature
            const count = Object.keys(profileAttributes).length; // Total number of tracks

            // Iterate over each track's attributes and calculate the sum for each feature
            Object.values(profileAttributes).forEach(feature => {
                Object.keys(feature).forEach(key => {
                    featureSums[key] = (featureSums[key] || 0) + feature[key];
                });
            });

            // Compute mean values for each feature and update state
            const featureMeans = {};
            Object.keys(featureSums).forEach(key => {
                featureMeans[key] = featureSums[key] / count;
            });

            console.log('Calculated Attribute Means:', featureMeans);
            setAttributeMeans(featureMeans); // Save calculated means in state
        }
    }, [profileAttributes]); // Dependencies: profileAttributes

    // Render the Profile component
    return (
        <div className='profile'>
            {/* Display user information */}
            <User title={displayName} />

            {/* Section to display top songs */}
            <div className='top-songs'>
                <h3>Top Songs</h3>
                <hr />
                {/* Render tracklist with the user's top tracks */}
                <Tracklist 
                    tracks={topTracks}
                    list={true}
                />
            </div>

            {/* Display analysis of audio features */}
            <ProfileAnalysis 
                attributes={attributeMeans}
            />
        </div>
    );
}

// Export the Profile component as the default export
export default Profile;