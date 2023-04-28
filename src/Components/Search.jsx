import useAxios from "../hooks/useAxios"
import { useState, useEffect } from 'react'

const getFiltered = (query, items) => {
    if(!query){
        return items;
    }

    return items.filter(name => items.includes(query))
}

const Search = () => {

    const [query, setQuery] = useState('');

    const response = useAxios('search?query=bitcoin');
    const items = response.response.coins;
    console.log(response.response.coins);

    const filteredItems = getFiltered(query, items);

  return (
    <div className="search-bar">
        
        <input className="searchBar" type="text" onChange={e => setQuery(e.target.value)} placeholder='Search for your investment of choice...'>

        </input>

        {filteredItems.map(value => <h1 key={value.name}>{value.name}</h1>)}

    </div>
  )
}

export default Search