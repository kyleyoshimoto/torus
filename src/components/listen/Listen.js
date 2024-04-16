import React, { useEffect } from 'react';
import './Listen.css';
import { useDispatch, useSelector } from 'react-redux';
import { getQueue, selectCurrentlyPlaying, selectQueue, getCurrentArtist, selectCurrentArtist } from '../../features/player/playerSlice';
import Tracklist from '../tracklist/Tracklist';
import { selectTopTracks } from '../../features/spotify/spotifySlice';
import { selectAttribute, getAttribute } from '../../features/search/searchSlice';

function Listen() {
    const dispatch = useDispatch();
    const currentlyPlaying = useSelector(selectCurrentlyPlaying);
    const CPId = currentlyPlaying.track.id;
    const topSong = useSelector(selectTopTracks);
    const queue = useSelector(selectQueue);
    const currentArtist = useSelector(selectCurrentArtist);

    const currentlyPlayingAttributes = useSelector(selectAttribute);
    let danceability = "";
    let energy = "";
    let loudness = "";
    let tempo = "";
    let valence = "";

    if (currentlyPlayingAttributes[CPId]) {
        danceability = currentlyPlayingAttributes[CPId].danceability;
        energy = currentlyPlayingAttributes[CPId].energy;
        loudness = currentlyPlayingAttributes[CPId].loudness;
        tempo = currentlyPlayingAttributes[CPId].tempo;
        valence = currentlyPlayingAttributes[CPId].valence;
    } else {
        danceability = "...";
        energy = "...";
        loudness = "...";
        tempo = "...";
        valence = "...";
    }

    useEffect(() => {
        dispatch(getQueue());
        console.log("QUEUE:");
        console.log(queue);
        dispatch(getCurrentArtist(currentlyPlaying.track.artistId));
        console.log("Current Artist:", currentArtist);

        dispatch(getAttribute(CPId));
        console.log(currentlyPlayingAttributes);
    
    }, [currentlyPlaying]);

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
        if (currentlyPlaying && danceability !== "") {
            return (
                <div className='breakdown'>
                    <div className='artist-breakdown'>
                        <img src={currentArtist.image} />
                        <div className='artist-details'>
                            <h3>{currentArtist.name}</h3>
                            <p><u>Followers:</u> {currentArtist.followers}</p>
                            <p><u>Genres:</u><br />{currentArtist.genres}</p>
                        </div>
                    </div>
                    <hr />
                    <div className='track-breakdown'>
                        <h3>{currentlyPlaying.track.name} | {currentlyPlaying.track.album.name}</h3>
                        <div className='attributes'>
                            <div className='danceability'>
                                <h4>Danceability: {danceability}</h4>
                                <p>Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.</p>
                            </div>
                            <div className='energy'>
                                <h4>Energy: {energy}</h4>
                                <p>Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.</p>
                            </div>
                            <div className='loudness'>
                                <h4>Loudness: {loudness} db</h4>
                                <p>The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks. Loudness is the quality of a sound that is the primary psychological correlate of physical strength (amplitude). Values typically range between -60 and 0 db.</p>
                            </div>
                            <div className='tempo'>
                                <h4>Tempo: {tempo} bpm</h4>
                                <p>The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration.</p>
                            </div>
                            <div className='valence'>
                                <h4>Valence: {valence}</h4>
                                <p>A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).</p>
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
                <p>Radar-Graph</p>
            </div>
            <div className='queue'>
                <h3>Queue</h3>
                <hr />
                {currentlyPlaying ?
                <Tracklist
                    tracks={queue}
                    list={true}
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