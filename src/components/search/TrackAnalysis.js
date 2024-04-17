import React from 'react';
import './TrackAnalysis.css';

function TrackAnalysis({ onAttributeTypeChange, toggledButton }) {
    const renderDescription = () => {
        if (toggledButton === 'danceability') {
            return (<p><b>Danceability</b> describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.</p>)
        } else if (toggledButton === 'energy') {
            return (<p><b>Energy</b> is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.</p>)
        } else if (toggledButton === 'loudness') {
            return (<p>The overall <b>loudness</b> of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks. Loudness is the quality of a sound that is the primary psychological correlate of physical strength (amplitude). Values typically range between -60 and 0 db.</p>)
        } else if (toggledButton === 'tempo') {
            return (<p>The overall estimated <b>tempo</b> of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration. Estimates are more accurate for electronic and similar genres or songs with a consistent beat.</p>)
        } else if (toggledButton === 'valence') {
            return (<p><b>Valance</b> is a measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).</p>)
        }
    }

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
            <div className='attribute-description'>
                {renderDescription()}
            </div>
        </div>
    )
}

export default TrackAnalysis;