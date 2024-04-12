import React, { useCallback } from 'react';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { selectAccessToken, addAccessToken, getUserProfile, getTopArtists, getTopTracks} from './features/spotify/spotifySlice';
import { useSelector } from 'react-redux';

import Login from './app/Login';
import Root from './components/Root';
import Home from './components/home/Home';
import Listen from './components/listen/Listen';
import Search from './components/search/Search';
import Profile from './components/profile/Profile';
import Playlists from './components/playlists/Playlists';

import Spotify from './features/spotify/spotify';

import './App.css';

const appRouter = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={ <Root />}>
    <Route index element={ <Home /> } />
    <Route path="/Listen" element={ <Listen /> } />
    <Route path="/Search" element={ <Search /> } />
    <Route path="/Profile" element={ <Profile /> } />
    <Route path="/Playlists" element={ <Playlists /> } />
  </Route>
));

function App() {
  const dispatch = useDispatch();
  let token = useSelector(selectAccessToken);
  console.log(`ACCESS TOKEN: ${token}`);
  //const isLoadingProfile = useSelector((state) => state.spotifyProfile.isLoadingProfile);
  //const failedToLoadProfile = useSelector((state) => state.spotifyProfile.failedToLoadProfile);

  let handleLogin = useCallback(() => {
    if (token) {
      return token;
    };
    dispatch(addAccessToken(Spotify.getAccessToken()));
    dispatch(getUserProfile());
    dispatch(getTopArtists());
    dispatch(getTopTracks());
  }, [token]);

  return (
    <div>
      {!token ? <Login handleLogin={handleLogin} /> : <RouterProvider router={appRouter}/>}
    </div>
  );
}

export default App;