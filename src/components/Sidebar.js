import React from 'react';
import logo from '../logoBlue.svg';
import './Sidebar.css';

function Sidebar() {
    return (
        <div className='sidebar'>
            <img src={logo}/>
        </div>
    )
}

export default Sidebar;