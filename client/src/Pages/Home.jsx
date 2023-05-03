import React from 'react'
import { useState, useEffect } from 'react'
import Trending from '../Components/Trending'
import Search from '../Components/Search'
// import { useHistory } from 'react-router-dom'
// import jwt from 'jsonwebtoken'

export default function Home() {

    const [nameExists, setName] = useState('');

    useEffect(() => {
        const nameExists = sessionStorage.getItem('name');
        setName(nameExists);
    }, [])


    return (
        <div>

            <h1 className='welcome'>Hello {nameExists ? sessionStorage.getItem('name') : 'user'}, welcome back!!</h1>

            <div className="mainpage">
                <h1>Track all your crypto investments in one place.</h1>

                <h2>Please Sign in to keep your tracked investments intact.</h2>

                <Search />

            </div>
        </div>
    )
}
