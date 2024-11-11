import React from 'react';
import RadarChart from '../radarchart/radarChart'
import './SearchPlaylist.css';

function PlaylistAnalysis() {
    return (
        <div className='search-playlist-analysis'>
            <div className='search-analysis'>
                <h2>Playlist Analysis</h2>
                <hr />
            </div>
            <div className='search-graph'>
                <h2>Graph</h2>
                <RadarChart />
            </div>
        </div>
    )
}

export default PlaylistAnalysis;