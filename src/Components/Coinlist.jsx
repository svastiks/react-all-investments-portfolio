import React from 'react'

const Coinlist = ({ image, name, symbol, price, volume }) => {
  return (
    <div className="coin-cont">
        <div className="coin-list">
            <img className = 'coin-image' src={image} alt='symbol'></img>
            <h1>{name}</h1>
            <p>{symbol}</p>
        </div>
        <div className="coin-data">
            <p>{price}</p>
            <p>{volume.toLocaleString()}</p>
        </div>
    </div>
  )
}

export default Coinlist