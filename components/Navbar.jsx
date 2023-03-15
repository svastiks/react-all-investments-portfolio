import React from 'react'

export default function Navbar() {
    return (
        <div>
            <nav className="navbar">
                <li className="nav-links">
                    <a>Home</a>
                </li>
                <li className="nav-links">
                    <a>Investments</a>
                </li>
                <li className="nav-links">
                    <a>APIs Used</a>
                </li>
                <li className="nav-links">
                    <a>Login to save investments!</a>
                </li>
            </nav>
        </div>
    )
}