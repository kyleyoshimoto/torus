import React from 'react';
import TrackAnalysis from './TrackAnalysis';
import SearchResults from './SearchResults';
import MakePlaylist from './MakePlaylist';
import './Search.css';
import SearchIcon from '@mui/icons-material/Search';

function Search() {
    return(
        <div className='search-page'>
            <div className='search-bar'>
                <SearchIcon fontSize="large" className='search-icon'/>
                <input type="text" placeholder="Tracks, Artists, Albums..."></input>
            </div>
            <TrackAnalysis />
            <SearchResults />
            <MakePlaylist />
        </div>
    )
}

export default Search;