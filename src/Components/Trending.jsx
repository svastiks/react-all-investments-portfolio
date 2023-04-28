import React from 'react'
import useAxios from '../hooks/useAxios'
import TrendingCoinList from '../Components/TrendingCoinList'

export default function Trending() {

    const { response } = useAxios('search/trending');
    console.log(response);
    return (

        <div className="crypto-trending">
            Trending Cryptos

            <div className="coin-list">

                {response && response.coins.map(coin =>
                    <TrendingCoinList key={coin.item.coin_id} coin={coin.item} />
                )}

            </div>

        </div>

    )
}