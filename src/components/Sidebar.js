import React from 'react';
import logo from '../logoWhite.svg';
import './Sidebar.css';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';

function Sidebar() {
    return (
        <div className='sidebar'>
            <div className="sidebar-header">
                <img src={logo} alt="logo"/>
                <h1>Torus</h1>
            </div>
            <div className='sidebar-links'>
                <div className='home-link link'>
                    <HomeIcon className='icon' fontSize='large'/>
                    <p>Home</p>
                </div>
                <div className='search-link link'>
                    <SearchIcon className='icon' fontSize='large'/>
                    <p>Search</p>
                </div>
                <div className='playlists-link link'>
                    <LibraryMusicIcon className='icon' fontSize='large'/>
                    <p>Playlists</p>
                </div>
            </div>
            <hr />
        </div>
    )
}

export default Sidebar;