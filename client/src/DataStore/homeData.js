import axios from 'axios'
import { create } from 'zustand'

// let api_key = 'EVNV8OCT92UUBVRL'
const homeData = create((set) => ({

    cryptos: [],

    fetchCrypto: async () => {

        const response = await axios.get('https://api.coingecko.com/api/v3/search/trending')

        const cryptomain = response.data.coins.map(crypto => {
            return {
                id: crypto.item.id,
                name: crypto.item.name,
                price: crypto.item.price_btc,
                symbol: crypto.item.symbol
            }
        })

        console.log(cryptomain)
        set({cryptos: cryptomain})

        // fetch('https://api.coingecko.com/api/v3/search/trending')
        //     .then(response => response.json())
        //     .then(res => {
        //         console.log(res.coins[2].item.id)

        //         const cryptos = res.coins.map(crypto => {
        //             return {
        //                 id: crypto.item.id,
        //                 name: crypto.item.name,
        //                 price: crypto.item.price_btc,
        //                 symbol: crypto.item.symbol
        //             }
        //         })
        //         console.log(cryptos)
        //         set({cryptos})
        //     })

    }

}))

export default homeData