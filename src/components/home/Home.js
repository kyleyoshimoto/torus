import React from 'react';
import User from './User';
import TopSongs from './TopSongs';
import ProfileAnalysis from './ProfileAnalysis';
import './Home.css';

function Home() {
    return (
        <div className="home">
            <User />
            <TopSongs />
            <ProfileAnalysis />
        </div>
    )
}

export default Home;