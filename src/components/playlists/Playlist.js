import React from 'react';
import './Playlist.css';

function Playlist(props) {
    const { name, img, total } = props;
    
    return (
        <div className='playlist'>
            <img src={img} />
            <div className='playlist-title'>
                <h3>{name}</h3>
                <p>{total} Tracks</p>
            </div>
        </div>
    )
}

export default Playlist;