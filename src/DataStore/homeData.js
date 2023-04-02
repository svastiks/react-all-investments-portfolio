import { create } from 'zustand'
import axios from 'axios'

const homeData = create((set) => ({

    stocks: [],

    fetchStocks: () => {

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '3dd95f8769msh90dd95ffcc2b051p1b50ebjsn3d1ca32d5917',
                'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
            }
        };

        fetch('https://twelve-data1.p.rapidapi.com/stocks?exchange=NASDAQ&format=json', options)
            .then(response => response.json())
            .then((data) => {
                console.log(data.data.name)
                // const stocks = data.data.stocks.map(stock => {
                //     return {
                //         name: stock.data.data.name,
                //         symbol: stock.data.data.symbol
                //     }
                // })
                // console.log(stocks)
            })
            .catch(err => console.error(err));

    }

}))

export default homeData