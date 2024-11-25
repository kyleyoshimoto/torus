import React, { useEffect, useState } from 'react';
import './PlaylistAnalysis.css';
import { useDispatch } from 'react-redux';
import RadarChart from '../radarchart/radarChart';
import { normalizeAttributes } from '../radarchart/nomalizeUtils';

function PlaylistAnalysis(props) {
    const { playlistAttributes } = props;

    // State to store the calculated means of playlist attributes
    const [attributeMeans, setAttributeMeans] = useState(null);

    // State to store the normalized attributes derived from the means
    const [normalizedAttributes, setNormalizedAttributes] = useState(null);

    const radarChartData = {
        labels: ['Danceability', 'Energy', 'Loudness', 'Tempo', 'Valence'],
        datasets: [
            {
                label: 'Recently Played Attributes (Normalized and Aggregated)',
                data: normalizedAttributes,
                backgroundColor: 'rgba(128, 0, 0, 0.7)',
                borderWidth: 1,
            },
        ],
    };

    // Effect to calculate the mean of playlist attributes when they are available
    useEffect(() => {
        if (playlistAttributes && Object.keys(playlistAttributes).length > 0) {
            const featureSums = {}; // Object to accumulate sums of each attribute
            const count = Object.keys(playlistAttributes).length; // Number of features to calculate the mean

            // Loop through each feature and accumulate its values
            Object.values(playlistAttributes).forEach(feature => {
                Object.keys(feature).forEach(key => {
                    featureSums[key] = (featureSums[key] || 0) + feature[key];
                });
            });

            // Calculate the mean for each attribute
            const featureMeans = {};
            Object.keys(featureSums).forEach(key => {
                featureMeans[key] = featureSums[key] / count;
            });

            console.log('Calculated Attribute Means:', featureMeans);
            setAttributeMeans(featureMeans); // Update the state with the calculated means
        }
    }, [playlistAttributes]); // Dependency: Recalculate means when playlistAttributes changes

    // Effect to normalize attributes when the means are available
    useEffect(() => {
        if (attributeMeans) {
            const normalized = normalizeAttributes(attributeMeans); // Normalize the calculated means
            setNormalizedAttributes(normalized); // Update the state with normalized attributes
            console.log('Normalized Attributes:', normalized);
        }
    }, [attributeMeans]); // Dependency: Recalculate normalized attributes when attributeMeans changes

    return (
        <div className='playlist-analysis'>
            <div className='graph'>
                {/* Render the RadarChart if normalized attributes are available; otherwise, display an empty <strong> */}
                {normalizedAttributes ? (
                    <RadarChart data={radarChartData} />
                ) : (
                    <strong></strong>
                )}
            </div>

            {/* Placeholder for future playlist analysis section */}
            {/*<div className='analysis'>
                <h2>Playlist Analysis</h2>
                <hr />
            </div>*/}
        </div>
    );
}

export default PlaylistAnalysis;