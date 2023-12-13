import React from 'react';
import Login from './app/Login';
import './App.css';

function App() {
  let token = false;
  return (
    <div>
      {!token ? <Login/> : <></>}
    </div>
  );
}

export default App;
