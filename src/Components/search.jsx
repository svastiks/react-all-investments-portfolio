import React from 'react'
import { useState } from 'react'

export const Search = () => {

    const [input, setInput] = useState("");

    const fetchData = (value) => {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '3dd95f8769msh90dd95ffcc2b051p1b50ebjsn3d1ca32d5917',
                'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
            }
        };

        fetch('https://twelve-data1.p.rapidapi.com/symbol_search?symbol=AA&outputsize=30', options)
            .then(response => response.json())
            .then(response => console.log(response))
            .then((json) => { const results = json.filter((user) =>{
                            return value && user;
                        });
                console.log(results)
            })
            .catch(err => console.error(err));

        // fetch('https://twelve-data1.p.rapidapi.com/symbol_search?symbol=AA&outputsize=30', options)
        //     .then((response) => response.json())
        //     .then((json) => { const results = json.filter((user) =>{
        //             return value && user && user.symbol && user.symbol.toLowerCase();
        //         });
        //         console.log(results)
        //     })
        //     .catch(err => console.error(err));
    }

    const handleChange = (value) => {
        setInput(value);
        fetchData(value)
    }

    return (
        <div className="mainpage">
            <h1>This tool allows you to track all your investments in one place.</h1>

            <div className="search-bar">
                <input className="searchBar" type="text"
                    value={input} onChange={(e) => { handleChange(e.target.value) }} placeholder='Search for your investment of choice...'></input>

            </div>
        </div>
    )
}