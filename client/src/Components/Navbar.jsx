import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {

    const [loginStatus, setLoginStatus] = useState('');

    useEffect(() => {
        const loginStatus = sessionStorage.getItem('Login') === 'LoggedIn';
        setLoginStatus(loginStatus)
    })

    const logout = () => {
        sessionStorage.clear();
        alert('You have been logged out!!')
        setLoginStatus(false)
        window.location.href = '/'
    }

    return (

        <div className="navbar">
            <div className="navbar-links">
                <Link to=''><img className='main-logo' src='Images/logo.png' alt='logo'></img></Link>
                <Link to='/'>Home</Link>
                <Link to='/trackerlist'>TrackList</Link>
                <Link to='/stocks'>Stocks</Link>
                {loginStatus ? null : <Link to='/register'>Sign Up</Link>}
                {loginStatus ? null : <Link to='/login'>Login</Link>}
                {loginStatus ? <Link to='/' onClick={logout}>Logout</Link> : null}
            </div>
        </div>

    )

}