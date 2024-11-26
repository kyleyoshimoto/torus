// Import necessary libraries and components
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAttributes, getSearch, selectAttributes, selectResults } from '../../features/search/searchSlice';

// Import custom components for track analysis, playlist creation, and tracklist display
import TrackAnalysis from './TrackAnalysis';
import MakePlaylist from './MakePlaylist';
import Tracklist from '../tracklist/Tracklist';

// Import CSS and icons for styling
import './Search.css';
import SearchIcon from '@mui/icons-material/Search';

function Search() {
    // Initialize Redux dispatch function and selectors for search results and track attributes
    const dispatch = useDispatch();
    const searchResults = useSelector(selectResults);
    const attributes = useSelector(selectAttributes);

    // State to manage the selected attribute type for track analysis (e.g., "danceability")
    const [attributeType, setAttributeType] = useState("danceability");

    const [tempPlaylist, setTempPlaylist] = useState([]);

    // Function to handle input change events in the search bar
    const handleInputChange = useCallback((event) => {
        console.log("KEY PRESSED:", event.key);
        console.log("INPUT VALUE:", event.target.value);

        // Trigger search when the Enter key is pressed
        if (event.key === 'Enter') {
            const input = event.target.value;

            // Dispatch search action with input value
            dispatch(getSearch(input))
                .then(() => {
                    console.log('SEARCH RESULTS:', searchResults);

                    // If search results exist, get attributes for each track
                    if (searchResults) {
                        let resultIds = searchResults.map(result => result.id).join(",");
                        console.log('RESULTIDS:',resultIds);

                        // Dispatch action to retrieve attributes based on track IDs
                        dispatch(getAttributes(resultIds));
                        console.log("ATTRIBUTES:");
                        console.log(attributes);
                    }
                });
        }
    }, [dispatch]);

    useEffect(() => {
        if (searchResults) {
            let resultIds = searchResults.map(result => result.id).join(",");
            console.log('RESULTIDS:',resultIds);

            dispatch(getAttributes(resultIds));
            console.log("ATTRIBUTES:");
            console.log(attributes);
        }
        
    }, [searchResults]);

    // Function to handle attribute type selection for track analysis
    const handleAttributeTypeChange = useCallback((type) => {
        setAttributeType(type);
        console.log("HANGLE ATTRIBUTE TYPE CHANGE:", type);
    }, []);

    const handleAddSong = useCallback((trackObject) => {
        // Add the new trackObject to the tempPlaylist
        setTempPlaylist((prevPlaylist) => [...prevPlaylist, trackObject]);
      }, []); // Dependency array: empty array means this callback function will not change unless explicitly needed

    // Render the Search component layout, including search bar, track analysis, and search results
    return (
        <div className='search-page'>
            <h2>Search</h2>
            
            {/* Search bar with icon and input field */}
            <div className='search-bar'>
                <SearchIcon fontSize="large" className='search-icon' />
                <input 
                    type="text" 
                    placeholder="Tracks, Artists, Albums..."
                    onKeyDown={handleInputChange}
                />
            </div>
            
            {/* TrackAnalysis component for selecting track attribute types */}
            <TrackAnalysis 
                onAttributeTypeChange={handleAttributeTypeChange} 
                toggledButton={attributeType} 
            />

            {/* Display search results and tracklist */}
            <div className="search-results">
                <h2>Search Results</h2>
                <hr />
                <Tracklist 
                    tracks={searchResults}
                    attributes={attributes}
                    attributeType={attributeType}
                    handleAddSong={handleAddSong}
                />
            </div>

            {/* MakePlaylist component for creating playlists */}
            <MakePlaylist 
                tempPlaylist={tempPlaylist}
                attributeType={attributeType}
                attributes={attributes}
            />
        </div>
    );
};

export default Search;