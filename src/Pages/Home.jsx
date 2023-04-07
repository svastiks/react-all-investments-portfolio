import React from 'react'
import homeData from '../DataStore/homeData'

export default function Home() {

    const mainData = homeData()

    React.useEffect(() => {

        mainData.fetchCrypto()

    }, [])


    return (
        <div>

            <div className="mainpage">
                <h1>This tool allows you to track all your investments in one place.</h1>

                <div className="search-bar">
                    <input className="searchBar" type="text" placeholder='Search for your investment of choice...'></input>

                </div>
            </div>
        </div>
    )
}
