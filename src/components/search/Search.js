import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSearch, selectResults } from '../../features/search/searchSlice';

import TrackAnalysis from './TrackAnalysis';
import MakePlaylist from './MakePlaylist';
import Tracklist from '../tracklist/Tracklist';

import './Search.css';
import SearchIcon from '@mui/icons-material/Search';

function Search() {
    const dispatch = useDispatch();
    const searchResults = useSelector(selectResults);

    const [searchInput, setSearchInput] = useState("");

    const search = useCallback((event) => {
        console.log(searchInput);
        dispatch(getSearch(searchInput, 'tracks'));
    }, [searchResults]);

    return(
        <div className='search-page'>
            <h2>Search</h2>
            <div className='search-bar'>
                <SearchIcon fontSize="large" className='search-icon'/>
                <input 
                    type="text" 
                    placeholder="Tracks, Artists, Albums..."
                    onKeyPress={event => {
                        if (event.key === "Enter") {
                            search()
                        }
                    }}
                    onChange={event => setSearchInput(event.target.value)}
                />
            </div>
            <TrackAnalysis />
            <div className="search-results">
                <h2>Search Results</h2>
                <hr />
                <Tracklist 
                    tracks={searchResults}
                />
            </div>
            <MakePlaylist />
        </div>
    )
};

export default Search;