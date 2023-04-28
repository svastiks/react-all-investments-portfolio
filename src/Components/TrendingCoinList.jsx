
const TrendingCoinList = ({ coin }) => {
    //console.log(coin);
  return (
    <div className="trending-coin-list">
        <div className="coins">
            
            {coin.score + 1}

            <img src={coin.small}></img>

            <span className = "trending-name">{coin.name + ' ('+(coin.symbol)+')'}</span>
            
            <br/><br/>
            
            Price: {coin.price_btc + ' '}
            {}
        </div>
    </div>
  )
}

export default TrendingCoinList