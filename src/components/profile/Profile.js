import React from 'react';
import User from './User';
import TopSongs from './TopSongs';
import ProfileAnalysis from './ProfileAnalysis';
import './Profile.css';

function Profile() {
    return (
        <div className='profile'>
            <User title="Username"/>
            <TopSongs />
            <ProfileAnalysis />
        </div>
    )
}

export default Profile;