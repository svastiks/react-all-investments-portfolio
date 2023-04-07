import { create } from 'zustand'
import axios from 'axios'

let api_key = 'EVNV8OCT92UUBVRL'
const homeData = create((set) => ({

    crypto: [],

    fetchCrypto: () => {

        fetch('https://api.coingecko.com/api/v3/search/trending')
            .then(response => response.json())
            .then(res => {
                console.log(res.coins[2].item.id)

                const cryptos = res.coins.map(crypto => {
                    return {
                        id: crypto.item.id,
                        name: crypto.item.name,
                        price: crypto.item.price_btc,
                        symbol: crypto.item.symbol
                    }
                })
                console.log(cryptos)
            })

       

    }

}))

export default homeData