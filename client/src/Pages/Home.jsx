import React from 'react'
import { useState, useEffect } from 'react'
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
        <main className="homepage-modern">
            <section className="homepage-hero">
                <div className="homepage-hero-icon" style={{display: 'flex', justifyContent: 'center', marginBottom: '1.2rem'}}>
                    {/* Crypto/finance SVG icon */}
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="24" cy="24" r="22" fill="#2563eb" fillOpacity="0.08"/>
                        <path d="M24 12V36M24 36C18.4772 36 14 31.5228 14 26C14 20.4772 18.4772 16 24 16C29.5228 16 34 20.4772 34 26C34 31.5228 29.5228 36 24 36Z" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="24" cy="26" r="3.5" fill="#2563eb"/>
                    </svg>
                </div>
                <h1 className="homepage-title">Track your crypto investments in one place.</h1>
                {nameExists ? (
                  <h2 className='homepage-welcome'>Hello {sessionStorage.getItem('name')}, welcome back!!</h2>
                ) : (
                  <div className="homepage-signin-cta-better">
                    <div className="signin-prompt-main">
                      <span className="signin-prompt-text">Sign in to keep your tracked investments intact.</span>
                      <Link className="home-signin-better" to='/login'>Sign in</Link>
                    </div>
                  </div>
                )}
            </section>
            <section className="homepage-search-section">
                <Search />
            </section>
        </main>
    )
}
