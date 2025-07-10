import { useState, useEffect } from 'react'
import axios from 'axios'
import CoinList from '../Components/Coinlist'

export default function Search() {

    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState('');
    const [apiStatus, setApiStatus] = useState('');

    useEffect(() => {
        axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=cad&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en`)
            .then(res => {
                setCoins(res.data);
                //console.log(res.data);
                setApiStatus(true);
            }).catch(error => {

                console.log(error)

                setApiStatus(false)

            });
    }, []);

    const handleChange = e => {
        setSearch(e.target.value);
    }

    const filteredCoins = coins.filter(coin =>
        coin.name.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="search-coin-cont">
            <div className="search-bar">
                <div className="search-input-wrapper">
                    <span className="search-icon">
                        {/* SVG search icon */}
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="9" cy="9" r="7" stroke="#94a3b8" strokeWidth="2"/>
                            <line x1="14.4142" y1="14" x2="18" y2="17.5858" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                    </span>
                    <input type='text' placeholder="Search for coins" className="search-input-modern" onChange={handleChange}></input>
                </div>
            </div>

            <div className="coins-grid">

                {apiStatus ?

                    filteredCoins.map(coin => {
                        return (
                            <div key={coin.id}>
                                <CoinList
                                    id={coin.id}
                                    image={coin.image}
                                    name={coin.name}
                                    symbol={coin.symbol}
                                    price={coin.current_price}
                                    volume={coin.market_cap}
                                />
                            </div>
                        )

                    })
                    : <h1 className='api-error'>Sorry, only have a limited number of API calls, please return in a few minutes. Thank you for your patience.</h1>}

            </div>

        </div>
    )

}

