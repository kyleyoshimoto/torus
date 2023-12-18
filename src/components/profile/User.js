import React from 'react';
import './User.css';
import djDog from '../../defaultProfPics/DJDog.jpeg';
import keyboardCat from '../../defaultProfPics/keyboardCat.jpeg';
import pianoDog from '../../defaultProfPics/pianoDog.jpeg';

const defaultProfilePics = [djDog, keyboardCat, pianoDog];

function User(props) {
    let profilePic = defaultProfilePics[Math.floor(Math.random() * 3)];

    return (
        <div className='user'>
            <img src={profilePic} />
            <div className='user-info'>
                <h2>{props.title}</h2>
                <p># Public Playlists | # Followers | # Following</p>
            </div>
        </div>
    )
}

export default User;