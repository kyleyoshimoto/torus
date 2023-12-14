import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { selectAccessToken, addAccessToken } from './app/spotifySlice';
import Spotify from './app/spotify';
import Login from './app/Login';
import Home from './components/Home';
import './App.css';
import { useSelector } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  let token = useSelector(selectAccessToken);
  console.log(`ACCESS TOKEN: ${token}`);

  const handleLogin = useCallback(() => {
    if (token) {
      return token;
    };
    dispatch(addAccessToken(Spotify.getAccessToken()));
  }, [token]);

  return (
    <div>
      {!token ? <Login handleLogin={handleLogin} /> : <Home />}
    </div>
  );
}

export default App;