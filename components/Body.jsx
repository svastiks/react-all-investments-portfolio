import React from 'react'
import ReactDOM from 'react-dom'

export default function HeaderText() {
    return (
        <div className="content">


            <h1 className="heading-content">This tool will help you track all your investments in one place</h1>


            <div className="search-bar">
                <form>
                    <input type="text" placeholder="Search all your investments here....." id="main-search"></input>
                </form>
            </div>
        <div className="home-button-container">
        <button id="home-investmentbutton">
            Check Watchlist
        </button>
        </div>
        </div>
    )
}