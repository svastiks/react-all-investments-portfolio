import { create } from 'zustand'

const homeData = create((set) => ({

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
            .then(response => console.log(response))
            .catch(err => console.error(err));
    }

}))

export default homeData