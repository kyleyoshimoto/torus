import React from 'react';
import './Track.css';

function Track(props) {
    const { name, key, artist, album, cover } = props;

    return (
        <div className='track' key={key}>
            <img src={cover} alt={`${album} artwork`}/>
            <div className='track-info'>
                <h4>{name}</h4>
                <p>{artist}</p>
                <p>{album}</p>
            </div>
            <div className='attribute'>
                <p>Attribute</p>
            </div>
        </div>
    )
};

export default Track;