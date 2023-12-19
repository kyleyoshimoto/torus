import React from 'react';
import './User.css';
import { selectDisplayName, selectProfilePic, selectFollowers } from '../../app/spotifySlice';
import djDog from '../../defaultProfPics/DJDog.jpeg';
import keyboardCat from '../../defaultProfPics/keyboardCat.jpeg';
import pianoDog from '../../defaultProfPics/pianoDog.jpeg';
import { useSelector } from 'react-redux';

const defaultProfilePics = [djDog, keyboardCat, pianoDog];

function User(props) {
    const profilePic = useSelector(selectProfilePic);
    const userFollowers = useSelector(selectFollowers);

    return (
        <div className='user'>
            <img src={profilePic ? profilePic : defaultProfilePics[Math.floor(Math.random() * 3)]} />
            <div className='user-info'>
                <h2>{props.title}</h2>
                <p># Public Playlists | {userFollowers} Followers | # Artists Following</p>
            </div>
        </div>
    )
}

export default User;