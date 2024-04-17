import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Track.css';
import { playSong, selectQueue } from '../../features/player/playerSlice';

function Track(props) {
    const { uri, name, key, artist, album, cover } = props;
    const dispatch = useDispatch();
    const queue = useSelector(selectQueue);

    const handlePlaySong = () => {
        if (queue) {
            const queueUris = [...queue.uris]
            if (queueUris.indexOf(uri) !== -1) {
                queueUris.splice(queueUris.indexOf(uri), 1);
            };
            queueUris.unshift(uri);
            dispatch(playSong(queueUris));
        }
    };

    return (
        <div className='track' key={key}>
            <img src={cover} alt={`${album} artwork`} onClick={handlePlaySong}/>
            <div className='track-info'>
                <h4>{name}</h4>
                <p>{artist}</p>
                <p>{album}</p>
            </div>
        </div>
    )
};

export default Track;