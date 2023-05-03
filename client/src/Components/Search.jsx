import useAxios from "../hooks/useAxios"
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
                console.log(res.data);
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
                <input type='text' placeholder="Search for coins" className="coin-search" onChange={handleChange}></input>
            </div>

            <div className="coins">

                {apiStatus ?

                    filteredCoins.map(coin => {
                        return (
                            <div>

                                <CoinList
                                    key={coin.id}
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

