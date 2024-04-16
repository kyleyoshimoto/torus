import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAttributes, getSearch, selectAttributes, selectResults } from '../../features/search/searchSlice';

import TrackAnalysis from './TrackAnalysis';
import MakePlaylist from './MakePlaylist';
import Tracklist from '../tracklist/Tracklist';

import './Search.css';
import SearchIcon from '@mui/icons-material/Search';

function Search() {
    const dispatch = useDispatch();
    const searchResults = useSelector(selectResults);
    const attributes = useSelector(selectAttributes);

    const [attributeType, setAttributeType] = useState("danceability");

    const handleInputChange = useCallback((event) => {
        console.log("KEY PRESSED:", event.key);
        console.log("INPUT VALUE:", event.target.value);
        if (event.key === 'Enter') {
            const input = event.target.value;
            dispatch(getSearch(input))
                .then(() => {
                    console.log(searchResults)
                    if (searchResults) {
                        let resultIds = searchResults.map(result => result.id).join("%");
                        console.log(resultIds);
                        dispatch(getAttributes(resultIds));
                        console.log("ATTRIBUTES:");
                        console.log(attributes);
                    }
                });
            
        }
    }, [dispatch]);

    const handleAttributeTypeChange = useCallback((type) => {
        setAttributeType(type);
    }, [])

    return(
        <div className='search-page'>
            <h2>Search</h2>
            <div className='search-bar'>
                <SearchIcon fontSize="large" className='search-icon'/>
                <input 
                    type="text" 
                    placeholder="Tracks, Artists, Albums..."
                    onKeyDown={handleInputChange}
                />
            </div>
            <TrackAnalysis onAttributeTypeChange={handleAttributeTypeChange} toggledButton={attributeType} />
            <div className="search-results">
                <h2>Search Results</h2>
                <hr />
                <Tracklist 
                    tracks={searchResults}
                    attributes={attributes}
                />
            </div>
            <MakePlaylist />
        </div>
    )
};

export default Search;