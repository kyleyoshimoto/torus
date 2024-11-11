import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Track.css';
import { playSong, selectQueue } from '../../features/player/playerSlice';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

function Track(props) {
    let { uri, name, key, artist, album, cover, attributeType, attributes } = props;
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

    if (attributeType) {
        return (
        <div className='track' key={key}>
            <img src={cover} alt={`${album} artwork`} onClick={handlePlaySong}/>
            <div className='track-info'>
                <h4>{name}</h4>
                <p>{artist}</p>
                <p>{album}</p>
            </div>
            <div className='track-attributes'>
                <p className='attribute-t'>{attributeType ? attributeType.toUpperCase() : ""}</p>
                <p className='attribute-value'>{attributes[attributeType]}</p>
            </div>
            <PlaylistAddIcon className='icon' fontSize='large'/>
        </div>
        )
    }

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