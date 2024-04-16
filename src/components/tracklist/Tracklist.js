import React from 'react';
import './Tracklist.css';
import Track from './Track';

function Tracklist(props) {
    const { tracks, list, attributes } = props;

    if (list) {
        return (
            <ol className='tracklist' style={{width: "92%"}}>
                {tracks.map((track) => {
                    return (
                        <li>
                            <Track
                                name={track.name}
                                key={track.id}
                                artist={track.artist}
                                album={track.album.name}
                                cover={track.album.cover}
                                attributes={attributes?.[track.id] || ""}
                            />
                        </li>
                    )
                })}
            </ol>
        )
    }

    return (
        <div className='tracklist'>
            {tracks.map((track) => {
                return (
                    <Track
                        name={track.name}
                        key={track.id}
                        artist={track.artist}
                        album={track.album.name}
                        cover={track.album.cover}
                        attributes={attributes?.[track.id] || ""}
                    />
                )
            })}
            <p>tracklist</p>
        </div>
    )
}

export default Tracklist;