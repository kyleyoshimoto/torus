import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../logos/logoWhite.svg';
import './Sidebar.css';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';

function Sidebar() {
    return (
        <div className='sidebar'>
            <div className="sidebar-header">
                <img src={logo} alt="logo"/>
                <h1>Torus</h1>
            </div>
            <div className="nav">
                <div className='back-forward'>
                    <NavLink className='back-forward-link'><ChevronLeftOutlinedIcon fontSize="large"/></NavLink>
                </div>
                <div className='back-forward'>
                    <NavLink className='back-forward-link'><ChevronRightOutlinedIcon fontSize="large" /></NavLink>
                </div>
            </div>
            <div className='sidebar-links'>
                <div className='home-link link'>
                    <HomeIcon className='icon' fontSize='large'/>
                    <NavLink to="/" className='navlink'>Home</NavLink>
                </div>
                <div className='search-link link'>
                    <SearchIcon className='icon' fontSize='large'/>
                    <NavLink to="/Search" className='navlink'>Search</NavLink>
                </div>
                <div className='playlists-link link'>
                    <LibraryMusicIcon className='icon' fontSize='large'/>
                    <NavLink className="navlink">Playlists</NavLink>
                </div>
            </div>
            <hr />
        </div>
    )
}

export default Sidebar;