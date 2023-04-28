import React from 'react'
import Trending from '../Components/Trending'
import Search from '../Components/Search'

export default function Home() {

    return (
        <div>

            <div className="mainpage">
                <h1>This tool allows you to track all your investments in one place.</h1>

                <Search />

                <div className="trending">
                    <Trending />
                </div>


            </div>
        </div>
    )
}
