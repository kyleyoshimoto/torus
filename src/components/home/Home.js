import React from 'react';
import logoMaroon from "../../logos/logoMaroon.svg";
import logoWhite from "../../logos/logoWhite.svg";
import './Home.css';

function Home() {
    return (
        <div className="home">
            <img className="background-logo" src={logoMaroon} />
            <div className='header'>
                <div className='top-songs top'>
                    <p>Top Songs</p>
                </div>
                <div className='top-artists top'>
                    <p>Top Artists</p>
                </div>
                <div className='top-genres top'>
                    <p>Top Genres</p>
                </div>
            </div>
        </div>
    )
}

export default Home;