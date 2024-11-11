import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Top.css';
import { playSong, selectQueue } from '../../features/player/playerSlice';

function Top(props) {
    const { items, subject } = props;
    const dispatch = useDispatch();
    const queue = useSelector(selectQueue);

    const handlePlaySong = (uri) => {
        if (uri.startsWith("spotify:artist:") || uri.startsWith("spotify:album:") || uri.startsWith("spotify:playlist:")) {
            dispatch(playSong(uri))
        } else {
            const queueUris = [...queue.uris]
            if (queueUris.indexOf(uri) !== -1) {
                queueUris.splice(queueUris.indexOf(uri), 1);
            };
            queueUris.unshift(uri);
            dispatch(playSong(queueUris));
        }
    };

    return (
        <div className='top'>
            <div className='top-subject'>
                <h3>Top {subject}</h3>
            </div>
            <div className='top-items'>
                <img src={items[0]?.image || items[0]?.album.cover} className='top-item1 top-item' onClick={() => handlePlaySong(items[0]?.uri)}/>
                <img src={items[1]?.image || items[1]?.album.cover} className='top-item2 top-item' onClick={() => handlePlaySong(items[1]?.uri)}/>
                <img src={items[2]?.image || items[2]?.album.cover} className='top-item3 top-item' onClick={() => handlePlaySong(items[2]?.uri)}/>
            </div>
                <ol className='rankings'>
                    <li className='top1'>{items[0]?.name}</li>
                    <li className='top2'>{items[1]?.name}</li>
                    <li className='top3'>{items[2]?.name}</li>
                </ol>
        </div>
    )
}

export default Top;