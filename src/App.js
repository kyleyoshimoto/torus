import React, {useEffect} from 'react';
import { selectAccessToken } from './app/spotifySlice';
import Login from './app/Login';
import './App.css';
import { useSelector } from 'react-redux';

function App() {
  const token = useSelector(selectAccessToken);
  console.log(`ACCESS TOKEN: ${token}`);

  return (
    <div>
      {!token ? <Login/> : <></>}
    </div>
  );
}

export default App;