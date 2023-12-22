import React from 'react';
import './Top.css';

function Top(props) {
    const { items, subject } = props;
    return (
        <div className='top'>
            <div className='top-subject'>
                <h3>Top {subject}</h3>
            </div>
            <div className='top-items'>
                <img src={items[0]?.image} className='top-item1 top-item' />
                <img src={items[1]?.image} className='top-item2 top-item' />
                <img src={items[2]?.image} className='top-item3 top-item' />
            </div>
                <ol className='rankings'>
                    <li className='top1'>{items[0]?.name}</li>
                    <li className='top2'>{items[1]?.name}</li>
                    <li className='top3'>{items[2]?.name}</li>
                </ol>
        </div>
    )
}

export default Top;