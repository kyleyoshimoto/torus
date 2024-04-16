import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

function Root() {
    return(
        <div className="root">
            <Sidebar />
            <Outlet />
        </div>
    )
}

export default Root;