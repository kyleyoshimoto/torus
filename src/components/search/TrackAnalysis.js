import React from 'react';
import './TrackAnalysis.css';

function TrackAnalysis({ onAttributeTypeChange, toggledButton }) {
    return (
        <div className='track-analysis'>
            <h2>Track Analysis</h2>
            <div className='attribute-type'>
                <button className={`tablinks ${toggledButton === 'danceability' ? 'active' : ''}`} id="danceability" onClick={() => onAttributeTypeChange("danceability")}>Danceability</button>
                <button className={`tablinks ${toggledButton === 'energy' ? 'active' : ''}`} id="energy" onClick={() => onAttributeTypeChange("energy")}>Energy</button>
                <button className={`tablinks ${toggledButton === 'loudness' ? 'active' : ''}`} id="loudness" onClick={() => onAttributeTypeChange("loudness")}>Loudness</button>
                <button className={`tablinks ${toggledButton === 'tempo' ? 'active' : ''}`} id="tempo" onClick={() => onAttributeTypeChange("tempo")}>Tempo</button>
                <button className={`tablinks ${toggledButton === 'valence' ? 'active' : ''}`} id="valence" onClick={() => onAttributeTypeChange("valence")}>Valence</button>
            </div>
            <hr />
        </div>
    )
}

export default TrackAnalysis;