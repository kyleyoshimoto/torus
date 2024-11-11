import React, { useState } from 'react';
import './Tracklist.css';
import Track from './Track';

function Tracklist(props) {
    const { tracks, list, attributeType, attributes } = props;

    console.log("ATTRIBUTES:",attributes)
    console.log("TRACK IDS",tracks)

    if(!tracks) {
        return <h1>Loading...</h1>
    }

    if (list) {
        return (
            <ol className='tracklist' style={{width: "92%"}}>
                {tracks.map((track) => {
                    return (
                        <li>
                            <Track
                                uri={track.uri}
                                name={track.name}
                                key={track.id}
                                artist={track.artist}
                                album={track.album.name}
                                cover={track.album.cover}
                                attributeType={attributeType}
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
                        uri={track.uri}
                        name={track.name}
                        key={track.id}
                        artist={track.artist}
                        album={track.album.name}
                        cover={track.album.cover}
                        attributeType={attributeType}
                        attributes={attributes?.[track.id] || ""}
                    />
                )
            })}
            <p>tracklist</p>
        </div>
    )
}

export default Tracklist;