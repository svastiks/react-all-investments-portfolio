import React from 'react'
import Trending from '../Components/Trending'
import Search from '../Components/Search'

export default function Home() {

    return (
        <div>

            <div className="mainpage">
                <h1>This tool allows you to track all your investments in one place.</h1>

                <h2>Please Sign in to keep your tracked investments intact.</h2>

                <Search />

            </div>
        </div>
    )
}
