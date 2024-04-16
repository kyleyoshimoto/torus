import React from 'react';
import User from './User';
import Tracklist from '../tracklist/Tracklist';
import ProfileAnalysis from './ProfileAnalysis';
import { selectDisplayName, selectTopTracks } from '../../features/spotify/spotifySlice';
import './Profile.css';
import { useSelector } from 'react-redux';

function Profile() {
    const displayName = useSelector(selectDisplayName);
    const topTracks = useSelector(selectTopTracks);

    return (
        <div className='profile'>
            <User title={displayName} />
            <div className='top-songs'>
                <h3>Top Songs</h3>
                <hr />
                <Tracklist 
                    tracks={topTracks}
                    list={true}
                />
            </div>
            <ProfileAnalysis />
        </div>
    )
};

export default Profile;