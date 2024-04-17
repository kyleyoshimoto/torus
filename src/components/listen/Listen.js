import React, { useEffect } from 'react';
import './Listen.css';
import { useDispatch, useSelector } from 'react-redux';
import { getQueue, selectCurrentlyPlaying, selectQueue, getCurrentArtist, selectCurrentArtist } from '../../features/player/playerSlice';
import Tracklist from '../tracklist/Tracklist';
import { selectTopTracks } from '../../features/spotify/spotifySlice';
import { selectAttribute, getAttribute } from '../../features/search/searchSlice';
import RadarChart from '../radarchart/radarChart';

function Listen() {
    const dispatch = useDispatch();
    const currentlyPlaying = useSelector(selectCurrentlyPlaying);
    const CPId = currentlyPlaying.track.id;
    const topSong = useSelector(selectTopTracks);
    const queue = useSelector(selectQueue);
    const currentArtist = useSelector(selectCurrentArtist);

    const currentlyPlayingAttributes = useSelector(selectAttribute);
    let danceability;
    let energy;
    let loudness;
    let tempo;
    let valence;

    if (currentlyPlayingAttributes) {
        danceability = currentlyPlayingAttributes.danceability;
        energy = currentlyPlayingAttributes.energy;
        loudness = currentlyPlayingAttributes.loudness;
        tempo = currentlyPlayingAttributes.tempo;
        valence = currentlyPlayingAttributes.valence;
    } else {
        danceability = "...";
        energy = "...";
        loudness = "...";
        tempo = "...";
        valence = "...";
    }

    useEffect(() => {
        dispatch(getQueue());

        dispatch(getCurrentArtist(currentlyPlaying.track.artistId));
        console.log("Current Artist:", currentArtist);

        dispatch(getAttribute(CPId));
        console.log(currentlyPlayingAttributes);
    
    }, [currentlyPlaying]);

    const normalize = (value, minMax) => {
        return ((value - minMax[0]) / (minMax[1] - minMax[0])) * 100;
    };

    const loudnessMinMax = [-40, 0];
    const tempoMinMax = [25, 200];

    const normalizedData = [
        currentlyPlayingAttributes.danceability * 100,
        currentlyPlayingAttributes.energy * 100,
        normalize(currentlyPlayingAttributes.loudness, loudnessMinMax),
        normalize(currentlyPlayingAttributes.tempo, tempoMinMax),
        currentlyPlayingAttributes.valence * 100
    ];

    console.log(normalizedData)

    const radarChartData = {
        labels: ['Danceability', 'Energy', 'Loudness', 'Tempo', 'Valence'],
        datasets: [
            {
                label: 'Currently Playing Attributes',
                data: normalizedData,
                backgroundColor: 'rgba(128, 0, 0, 0.7)',
                borderWidth: 1,
            },
        ],
    };

    const renderSpotlight = () => {
        if (currentlyPlaying) {
            return (
                <div className='song-info'>
                    <h2>Playing</h2>
                    <img src={currentlyPlaying.track.album.cover[0].url} />
                    <div className='song-details'>
                        <h3>{currentlyPlaying.track.name}</h3>
                        <h5>{currentlyPlaying.track.album.name}</h5>
                        <h4>{currentlyPlaying.track.artist}</h4>
                    </div>
                </div>
            )
        } else {
            return (
                <div className='song-info'>
                    <img src={topSong[0]?.album.cover} />
                    <div className='song-details'>
                        <h3>{topSong[0]?.name}</h3>
                        <h4>{topSong[0]?.artist}</h4>
                        <h5>{topSong[0]?.album.name}</h5>
                    </div>
                </div>
            )
        }
    } 

    const renderBreakdown = () => {
        if (currentlyPlaying && danceability !== "" && currentArtist && currentArtist.genres) {
            console.log(currentArtist.genres)
            const genresList = currentArtist.genres.map((genre, index) => (
                <li key={index}>{genre.charAt(0).toUpperCase() + genre.slice(1)}</li>
            ));

            const formattedNumber = currentArtist.followers.toLocaleString();

            return (
                <div className='breakdown'>
                    <div className='artist-breakdown'>
                        <img src={currentArtist.image} />
                        <div className='artist-details'>
                            <h3>{currentArtist.name}</h3>
                            <p><b>Followers</b>:<br /> {formattedNumber}</p>
                            <p><b>Genres</b>:</p>
                            <ul>{genresList}</ul>
                        </div>
                    </div>
                    <hr />
                    <div className='track-breakdown'>
                        <h3>{currentlyPlaying.track.name} | {currentlyPlaying.track.album.name}</h3>
                        <div className='attributes'>
                            <div className='attribute'>
                                <h4>Danceability: {(danceability * 100).toFixed(1)}</h4>
                                <p>Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0 is least danceable and 100 is most danceable.</p>
                            </div>
                            <div className='attribute'>
                                <h4>Energy: {(energy * 100).toFixed(1)}</h4>
                                <p>Energy is a measure from 0 to 100 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.</p>
                            </div>
                            <div className='attribute'>
                                <h4>Loudness: {loudness} db</h4>
                                <p>The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks. Loudness is the quality of a sound that is the primary psychological correlate of physical strength (amplitude). Values typically range between -60 and 0 db.</p>
                            </div>
                            <div className='attribute'>
                                <h4>Tempo: {tempo} bpm</h4>
                                <p>The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration. Estimates are more accurate for electronic and similar genres or songs with a consistent beat.</p>
                            </div>
                            <div className='attribute'>
                                <h4>Valence: {(valence * 100).toFixed(1)}</h4>
                                <p>A measure from 0 to 100 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <></>
            )
        }
    }

    return (
        <div className='listen'>
            <h2>Listen</h2>
            {renderSpotlight()}
            <div className='radar-graph'>
                <RadarChart
                    data={radarChartData}
                />
            </div>
            <div className='queue'>
                <h3>Queue</h3>
                <hr />
                {currentlyPlaying ?
                <Tracklist
                    tracks={queue}
                />
                :
                <p>Play music with spotify premium.</p>
                }
            </div>
            {renderBreakdown()}
        </div>
    )
}

export default Listen;