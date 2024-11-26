import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Track.css';
import { playSong, selectQueue } from '../../features/player/playerSlice';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

function Track(props) {
    // Destructure the props passed down to the component
    const { uri, name, key, artist, album, cover, attributeType, attributes, handleAddSong } = props;

    // Access Redux dispatch function to dispatch actions
    const dispatch = useDispatch();
    
    // Get the current queue state from Redux store
    const queue = useSelector(selectQueue);

    // Handle the song play action
    const handlePlaySong = () => {
        if (queue) {
            // If there is already a queue, create a new queue array with the current URI at the front
            const queueUris = [...queue.uris];
            
            // Remove the current track from the queue if it exists
            if (queueUris.indexOf(uri) !== -1) {
                queueUris.splice(queueUris.indexOf(uri), 1);
            }
            
            // Add the current track URI to the front of the queue
            queueUris.unshift(uri);
            
            // Dispatch the playSong action to update the queue and play the song
            dispatch(playSong(queueUris));
        } else {
            // If there is no existing queue, just dispatch the playSong action with the single track URI
            dispatch(playSong(uri));
        }
    };

    // Function to handle the "Add to Playlist" action when the PlaylistAddIcon is clicked
    const clickAddSong = () => {
        // Construct the track object with necessary details
        const track = {
            name: name,
            uri: uri,
            id: key,
            artist: artist,
            album: {
                name: album,
                cover: cover
            }
        };
        
        // Call the passed handleAddSong function to add the track to the playlist
        handleAddSong(track);
    };

    return (
        <div className='track'>
            {/* Render the album cover image. When clicked, it will play the song */}
            <img src={cover} alt={`${album} artwork`} onClick={handlePlaySong} />
            
            <div className='track-info'>
                {/* Display the song name, artist, and album name */}
                <h4>{name}</h4>
                <p>{artist}</p>
                <p>{album}</p>
            </div>

            {/* Conditionally render track attributes if attributeType is provided */}
            {attributeType && attributes[attributeType] && (
                <div className='track-attributes'>
                    <p className='attribute-t'>{attributeType ? attributeType.toUpperCase() : ""}</p>
                    <p className='attribute-value'>{attributes[attributeType] || 'N/A'}</p>
                </div>
            )}

            {/* Playlist Add Icon: Click to add the track to the temporary playlist */}
            <PlaylistAddIcon 
                className='icon' 
                fontSize='large' 
                onClick={clickAddSong} 
                style={{ justifySelf: 'flex-end' }} // For grid layout
            />
        </div>
    );
};

export default Track;