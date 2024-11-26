import React from 'react';
import RadarChart from '../radarchart/radarChart'
import './SearchPlaylist.css';

function PlaylistAnalysis() {
    return (
        <div className='search-playlist-analysis'>
            <div className='search-graph'>
                <RadarChart />
            </div>
        </div>
    )
}

export default PlaylistAnalysis;