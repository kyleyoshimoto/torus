import React, { useEffect, useState } from 'react';
import './ProfileAnalysis.css';
import RadarChart from '../radarchart/radarChart';
import { normalizeAttributes } from '../radarchart/nomalizeUtils';

function ProfileAnalysis(props) {
    const { attributes } = props;

    // State to store the normalized attributes derived from the means
    const [normalizedAttributes, setNormalizedAttributes] = useState(null);

    // Effect to normalize attributes when the means are available
    useEffect(() => {
        if (attributes) {
            // Normalize the calculated means for each attribute
            const normalized = normalizeAttributes(attributes);
            
            // Update the state with normalized attributes
            setNormalizedAttributes(normalized);
            
            // Log normalized attributes for debugging purposes
            console.log('Normalized Attributes:', normalized);
        }
    }, [attributes]); // Dependency: Recalculate normalized attributes when attributeMeans changes

    // Prepare the data for the RadarChart
    const radarChartData = {
        labels: ['Danceability', 'Energy', 'Loudness', 'Tempo', 'Valence'],
        datasets: [
            {
                label: 'Profile Top Tracks Attributes (Normalized and Aggregated)',
                data: normalizedAttributes,  // Normalized values for radar chart
                backgroundColor: 'rgba(128, 0, 0, 0.7)', // Color for radar chart's fill
                borderWidth: 1, // Border width for radar chart lines
            },
        ],
    };

    return (
        <div className='profile-analysis'>
            {/* Radar chart displaying the normalized attributes */}
            <div className='graph'>
                <RadarChart 
                    data={radarChartData}  // Pass the chart data to RadarChart
                />
            </div>

            {/* Profile Analysis section (commented out for now) */}
            {/*
            <div className='analysis'>
                <h2>Profile Analysis</h2>
                
                <div className='dancability-bar'>
                    <div className="line">
                        <div 
                            className="marker" 
                            style={{ left: `${normalizedAttributes[0]}%` }} // Position the marker for Danceability
                        />
                    </div>
                    <div className="labels">
                        <span>Min</span>
                        <span>Max</span>
                    </div>
                </div>

                <div className='energy-bar'>
                    <div className="line">
                        <div 
                            className="marker" 
                            style={{ left: `${normalizedAttributes[1]}%` }} // Position the marker for Energy
                        />
                    </div>
                    <div className="labels">
                        <span>Min</span>
                        <span>Max</span>
                    </div>
                </div>

                <div className='loudness-bar'></div>
                <div className='tempo-bar'></div>
                <div className='valence-bar'></div>
                <hr />
            </div>
            */}
        </div>
    );
}

export default ProfileAnalysis;