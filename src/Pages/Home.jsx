import React from 'react'
import Trending from '../Components/Trending'
import Search from '../Components/Search'

export default function Home() {

    return (
        <div>

            <div className="mainpage">
                <h1>Track all your crypto investments in one place.</h1>

                <h2>Please Sign in to keep your tracked investments intact.</h2>

                <Search />

            </div>
        </div>
    )
}
