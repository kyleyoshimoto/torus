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
            const normalized = normalizeAttributes(attributes); // Normalize the calculated means
            setNormalizedAttributes(normalized); // Update the state with normalized attributes
            console.log('Normalized Attributes:', normalized);
        }
    }, [attributes]); // Dependency: Recalculate normalized attributes when attributeMeans changes

    const radarChartData = {
        labels: ['Danceability', 'Energy', 'Loudness', 'Tempo', 'Valence'],
        datasets: [
            {
                label: 'Profile Top Tracks Attributes (Normalized and Aggregated)',
                data: normalizedAttributes,
                backgroundColor: 'rgba(128, 0, 0, 0.7)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className='profile-analysis'>
            <div className='graph'>
                <RadarChart 
                    data={radarChartData}
                />
            </div>
            <div className='analysis'>
                <h2>Profile Analysis</h2>
                <hr />
            </div>
        </div>
    )
}

export default ProfileAnalysis;