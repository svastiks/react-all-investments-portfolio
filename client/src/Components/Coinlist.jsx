import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Coinlist = (coin) => {
    const [isDisabled, setDisabled] = useState('');
    const [isDisabledRemove, setDisabledRemove] = useState('');
    const navigate = useNavigate();

    const send = () => {
        const array = [coin.id, coin.image, coin.name, coin.symbol, coin.price, coin.volume];
        localStorage.setItem(`${coin.id}`, JSON.stringify(array));
        //console.log('Works');

        if (localStorage.getItem(coin.id) != null) {
            setDisabled(true);
            setDisabledRemove(false);
            //console.log('Disabled');
        }
        else {
            setDisabled(false);
            setDisabledRemove(false);
        }
    }

    const removeCoin = (id) => {
        localStorage.removeItem(id);
        setDisabledRemove(true);
        setDisabled(false);

        // window.location.reload(true);
    }

    useEffect(() => {
        setDisabled(localStorage.getItem(coin.id) !== null)
    }, [coin.id])

    return (
        <div className='coin-card-modern'>
            <div className='coin-card-main'>
                <div className='coin-card-image'>
                    <img className='coin-image' src={coin.image} alt='symbol' />
                </div>
                <div className='coin-card-info'>
                    <div className='coin-card-title'>{coin.name} <span className='coin-card-symbol'>({coin.symbol})</span></div>
                    <div className='coin-card-meta'>
                        <span className='coin-card-label'>Price</span>
                        <span className='coin-card-value'>{coin.price.toLocaleString()} CAD</span>
                    </div>
                    <div className='coin-card-meta'>
                        <span className='coin-card-label'>Market&nbsp;Cap</span>
                        <span className='coin-card-value'>{coin.volume.toLocaleString()}</span>
                    </div>
                </div>
                <div className='coin-card-actions'>
                    <button id='add-btn' className={isDisabled ? "coin-btn-disabled" : "coin-btn-track"} onClick={() => send(coin)} disabled={isDisabled}>Track</button>
                    <button className='coin-btn-profit' onClick={() => navigate(`/calculator?coin=${coin.id}`)}>
                        Profit?
                    </button>
                    <button id='remove-btn' className={isDisabledRemove ? "coin-btn-disabled-remove" : "coin-btn-remove"} onClick={() => removeCoin(coin.id)} disabled={!isDisabled}>Remove</button>
                </div>
            </div>
        </div>
    )
}

export default Coinlist