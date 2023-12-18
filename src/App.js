import React, { useCallback, useEffect } from 'react';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { selectAccessToken, selectProfile, addAccessToken, getUserProfile } from './app/spotifySlice';
import { useSelector } from 'react-redux';

import Login from './app/Login';
import Root from './components/Root';
import Home from './components/home/Home';
import Search from './components/search/Search';
import Profile from './components/profile/Profile';
import Playlists from './components/playlists/Playlists';

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
  let token = useSelector(selectAccessToken);
  console.log(`ACCESS TOKEN: ${token}`);
  const user = useSelector((state) => state.spotifyProfile.userProfile);
  const isLoadingProfile = useSelector((state) => state.spotifyProfile.isLoadingProfile);
  const failedToLoadProfile = useSelector((state) => state.spotifyProfile.failedToLoadProfile);

  let handleLogin = useCallback(() => {
    if (token) {
      return token;
    };
    dispatch(addAccessToken(Spotify.getAccessToken()));
  }, [token]);

  useEffect(() => {
    dispatch(getUserProfile());
  }, []);

  return (
    <div>
      {!token ? <Login handleLogin={handleLogin} /> : <RouterProvider router={appRouter}/>}
    </div>
  );
}

export default App;