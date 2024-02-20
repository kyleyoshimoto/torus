import React, { useCallback } from 'react';
import './Playlist.css';

function Playlist(props) {
    const { name, img, total, id, onSelection } = props;

    const handleSelection = useCallback(() => {
        onSelection(id);
    })
    
    return (
        <div className='playlist' onClick={handleSelection}>
            <img src={img} />
            <div className='playlist-title'>
                <h3>{name}</h3>
                <p>{total} Tracks</p>
            </div>
        </div>
    )
}

export default Playlist;