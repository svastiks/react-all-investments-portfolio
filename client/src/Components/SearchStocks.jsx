import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import dotenv from 'dotenv'
// dotenv.config();

const SearchStocks = () => {

    const [stocks, setStocks] = useState([]);
    const [search, setSearch] = useState('');

    //const api_key = process.env.STOCK_API_KEY;
    const api_key = 'ch7uaupr01qhapm5gef0ch7uaupr01qhapm5gefg';
    //console.log(api_key);

    useEffect(() => {
        axios.get(`https://finnhub.io/api/v1/search?q=apple&token=${api_key}`)
            .then(res => {
                setStocks(res.data);
                //console.log(res.data);
            }).catch(error => console.log(error));
    }, []);

    const handleChange = e => {
        setSearch(e.target.value);
    }

    // const filteredStocks = stocks.filter(stocks =>
    //     stocks.description.toLowerCase().includes(search.toLowerCase())
    // )

    return (
        <div>

            <h1 className="stocks-heading">THIS PAGE IS CURRENTLY IN PROGRESS....</h1>

            {/* <div className="search-bar">
                <input type='text' placeholder="Search for stocks" className="stock-search" onChange={handleChange}></input>
            </div> */}

            {/* {filteredStocks.map(stock => {
                return (

                    <Container>
                        <Row>
                            <Col>
                                {stock.description}
                            </Col>
                            <Col>
                                {stock.displaySymbol}
                            </Col>
                            <Col>
                                {stock.}
                            </Col>
                        </Row>
                    </Container>

                )
            })} */}
        </div>
    )
}

export default SearchStocks