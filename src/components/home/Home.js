import React from 'react';
import { selectTopTracks, selectTopArtists } from '../../features/spotify/spotifySlice';
import { useSelector } from 'react-redux';
import Top from './Top';
import './Home.css';

function Home() {
    const topTracks = useSelector(selectTopTracks);
    const topArtists = useSelector(selectTopArtists);
    return (
        <div className="home">

            <div className='header'>
                <Top className="top-songs" subject="Songs" items={topTracks} />
                <Top className="top-artists" subject="Artists" items={topArtists} />
                {/*<Top className="top-genres" subject="Genres" />*/}
            </div>
            <div className='recently-played'>
                <p>Recently Played</p>
                <hr />
            </div>

            <div className='listening-mood'>
                <p>Listening Behavior</p>
                <hr />
            </div>
        </div>
    )
}

export default Home;