import React, { useCallback } from 'react';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { selectAccessToken, addAccessToken } from './app/spotifySlice';
import { useSelector } from 'react-redux';

import Login from './app/Login';
import Root from './components/Root';
import Home from './components/home/Home';
import Search from './components/search/Search';
import Profile from './components/profile/Profile';
import Playlists from './components/Playlists/Playlists';

import Spotify from './app/spotify';

import './App.css';

const appRouter = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={ <Root />}>
    <Route index element={ <Home /> } />
    <Route path="/Search" element={ <Search /> } />
    <Route path="/Profile" element={ <Profile /> } />
    <Route path="/Playlists" element={ <Playlists /> } />
  </Route>
));

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
      {!token ? <Login handleLogin={handleLogin} /> : <RouterProvider router={appRouter}/>}
    </div>
  );
}

export default App;