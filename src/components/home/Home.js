import React from 'react';
import Top from './Top';
import logoMaroon from "../../logos/logoMaroon.svg";
import './Home.css';

function Home() {
    return (
        <div className="home">
            <img className="background-logo" src={logoMaroon} />
            <div className='header'>
                <Top className="top-songs" subject="Songs"/>
                <Top className="top-artists" subject="Artists"/>
                {/*<Top className="top-genres" subject="Genres" />*/}
            </div>
        </div>
    )
}

export default Home;