import React from 'react'
import Trending from '../Components/Trending'
import Search from '../Components/Search'
import { useLocation } from 'react-router-dom'

export default function Home() {

    const location = useLocation();

    return (
        <div>

            {/* <h1>Hello
                {location.state.id}
                , welcome back!!</h1> */}

            <div className="mainpage">
                <h1>Track all your crypto investments in one place.</h1>

                <h2>Please Sign in to keep your tracked investments intact.</h2>

                <Search />

            </div>
        </div>
    )
}
