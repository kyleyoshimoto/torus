import React from 'react';
import './ProfileAnalysis.css';
import RadarChart from '../radarchart/radarChart';

function ProfileAnalysis() {
    return (
        <div className='profile-analysis'>
            <div className='graph'>
                <RadarChart />
            </div>
            <div className='analysis'>
                <h2>Profile Analysis</h2>
                <hr />
            </div>
        </div>
    )
}

export default ProfileAnalysis;