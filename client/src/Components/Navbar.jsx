import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaHandHoldingUsd } from 'react-icons/fa';

export default function Navbar() {

    const [loginStatus, setLoginStatus] = useState('');

    useEffect(() => {
        const loginStatus = sessionStorage.getItem('Login') === 'LoggedIn';
        setLoginStatus(loginStatus)
    }, []);

    const logout = () => {
        sessionStorage.clear();
        alert('You have been logged out!!')
        setLoginStatus(false)
        window.location.href = '/'
    }

    return (

        <nav className="navbar-modern">
            <div className="navbar-content">
                <Link to='/' className='navbar-logo'>
                    <FaHandHoldingUsd size={32} />
                </Link>
                <div className="navbar-links">
                    <Link to='/'>Home</Link>
                    <Link to='/trackerlist'>TrackList</Link>
                    <Link to='/calculator'>Calculator</Link>
                    {loginStatus ? null : <Link to='/register'>Sign Up</Link>}
                    {loginStatus ? null : <Link to='/login'>Login</Link>}
                    {loginStatus ? <button className="logout-btn" onClick={logout}>Logout</button> : null}
                </div>
            </div>
        </nav>

    )

}