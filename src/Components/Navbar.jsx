import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {

    return (

        <div className="navbar">
            <div className="navbar-links">
                <Link to='/'><img className='main-logo' src='Images/logo.png' alt='logo'></img></Link>
                <Link to='/'>Home</Link>
                <Link to='/trackerlist'>TrackList</Link>
                {/* <Link to='/trending'>Trending</Link> */}
                <Link to='/login'>Login</Link>
                <Link to='/signup'>Sign Up</Link>
            </div>
        </div>

    )



}