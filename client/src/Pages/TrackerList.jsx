import React, { createContext, useEffect, useState } from 'react'
import axios, { all } from 'axios'
import Container from 'react-bootstrap/Container';
import Chart from '../Components/Chart'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const TrackerList = (props) => {

  // const [coins, setCoins] = useState([]);

  // useEffect(() => {
  //   axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=cad&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en`)
  //     .then(res => {
  //       setCoins(res.data);
  //       console.log(res.data);
  //     }).catch(error => console.log(error))
  // }, []);

  const allItems = { ...localStorage };
  // const item = JSON.parse(allItems);
  //console.log(allItems);
  const itemKeys = Object.keys(allItems);
  //console.log(itemKeys);

  const [dataArray, setDataArray] = useState([])

  useEffect(() => {
    const newDataArray = [];
    for (const key in allItems) {
      if (allItems.hasOwnProperty(key)) {
        const parsedArray = JSON.parse(allItems[key]);

        const finalArray = {
          image: parsedArray[1],
          name: parsedArray[0],
          symbol: parsedArray[3],
          price: parsedArray[4],
          marketCap: parsedArray[5]
        };
        newDataArray.push(finalArray);
      }
    }
    setDataArray(newDataArray);
  }, [])

  //console.log(dataArray);

  const removeCoin = (id) => {
    localStorage.removeItem(id);

    window.location.reload(true);
  }

  return (

    <div className="tracker-list-cont">
      <div className="tracker-list">
        <div className='tracked-heading'>
          TRACKED USER INVESTMENTS
        </div>
        {dataArray.map((data) => {
          return (
            <Container className='mapped-list' id={data.name}>
              <Row className='list-row'>
                <Col className='list-image'>
                  <img className='tracker-coinImage' src={data.image} alt='coinImage'></img>
                </Col>
                <Col className='list-name'>
                  {data.name}
                </Col>
                <Col className='list-symbol'>
                  {data.symbol}
                </Col>
                <Col className='list-price'>
                  {data.price.toLocaleString()}
                </Col>
                {/* <Col>
                  {data.marketCap.toLocaleString()}
                </Col> */}
                <Col>
                  <button className='listRemove' onClick={() => removeCoin(data.name)}>Remove</button>
                </Col>
                <Row>
                  <Chart
                    key={data.name}
                    id={data.name}
                  />
                </Row>
              </Row>
            </Container>
          )
        })}

      </div>
    </div>
  )
}

export default TrackerList