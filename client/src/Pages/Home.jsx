import React from 'react'
import { useState, useEffect } from 'react'
import Trending from '../Components/Trending'
import Search from '../Components/Search'
import { Link } from 'react-router-dom'

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


            <div className="mainpage">
                <h1>Track your crypto investments in one place.</h1>

                <h2 className='welcome'>Hello {nameExists ? sessionStorage.getItem('name') : 'user'}, welcome back!!</h2>

                {nameExists ? null :
                    <h7>Please <Link className="home-signin" to='/login'> Sign in </Link>to keep your tracked investments intact.</h7>
                }
                <Search />

            </div>
        </div>
    )
}
