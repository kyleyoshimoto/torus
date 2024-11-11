import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import './Playlist.css';
import { playSong } from '../../features/player/playerSlice';

function Playlist(props) {
    const { name, uri, img, total, id, onSelection } = props;
    const dispatch = useDispatch()

    const handleSelection = useCallback(() => {
        onSelection(id);
    })

    const handlePlayPlaylist = () => {
        dispatch(playSong(uri))
    };
    
    return (
        <div className='playlist'>
            <img src={img} onClick={handlePlayPlaylist}/>
            <div className='playlist-title' onClick={handleSelection}>
                <h3>{name}</h3>
                <p>{total} Tracks</p>
            </div>
        </div>
    )
}

export default Playlist;