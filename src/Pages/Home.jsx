import React from 'react'
import homeData from '../DataStore/homeData'
import { Link } from 'react-router-dom'
import useEffect from 'react'

export default function Home() {

    const data = homeData()

    React.useEffect(() => {

        console.log(data.fetchCrypto())

    }, [])

    return (
        <div>

            <div className="mainpage">
                <h1>This tool allows you to track all your investments in one place.</h1>

                <div className="search-bar">
                    <input className="searchBar" type="text" placeholder='Search for your investment of choice...'></input>

                </div>

                {/* <div className="render">
                    {data.coins.map(crypto => {
                        return (
                            <div key={crypto.id}>
                                <Link to={`/${crypto.id}`}>
                                    {crypto.name}
                                </Link>
                            </div>
                        )
                    })}
                </div> */}


            </div>
        </div>
    )
}
