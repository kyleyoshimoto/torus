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
  //let token = useSelector(selectAccessToken); UNCOMMENT WHEN READY FOR DEPLOYMENT
  //DELETE TOKEN, SWITCH TO CONST, AND DELETE COMMENT WHEN READY FOR DEPLOYMENT
  const token = 'BQA2VmW2fKsbLWo1kVHEVh__99GNHs7j_vA3E278NQp4UmlMSBExDprFyoubgMCqIlB63PvJXYFwk3fvQczIIpXe858uS_zkfeVwXzjCKvE0Ir9XbhWVUR5P3b63ByD6mjBeCxR68yDEWj3R6N20C4wcxfQNmJim_gnOvSVSzqiwVE_7lTj_fQBnfBWxCIyEwH3eKXZa5_gjKkvsJb6HFBh8YNgjvi7CWqYj6v7SleZZzDJao0fpPqf0zdNsUbggSsFQQUm5VMG9ERDi9qsIGbNNdCI';
  console.log(`ACCESS TOKEN: ${token}`);

  let handleLogin /*= useCallback(() => {
    if (token) {
      return token;
    };
    dispatch(addAccessToken(Spotify.getAccessToken()));
  }, [token]);*/

  return (
    <div>
      {!token ? <Login handleLogin={handleLogin} /> : <Home />}
    </div>
  );
}

export default App;