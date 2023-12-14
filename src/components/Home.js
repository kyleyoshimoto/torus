import React from 'react';
import { RouteProvider } from 'react-router-dom';
import Sidebar from './Sidebar';
import './Home.css';

function Home() {
    return (
        <div className="home">
            <Sidebar />
        </div>
    )
}

export default Home;