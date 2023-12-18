import React from 'react';
import './Top.css';

function Top(props) {
    return (
        <div className='top'>
            <div className='top-subject'>
                <h3>Top {props.subject}</h3>
            </div>
            <div className='top-items'>
                <div className='top-item1 top-item'></div>
                <div className='top-item2 top-item'></div>
                <div className='top-item3 top-item'></div>
            </div>
        </div>
    )
}

export default Top;