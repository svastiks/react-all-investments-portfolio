import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState';
import TrackerList from '../Pages/TrackerList'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Coinlist = (coin) => {

    const send = () => {
        // let count = 0;
        // count++
        const array = [coin.id, coin.image, coin.name, coin.symbol, coin.price, coin.volume];
        { localStorage.setItem(`${coin.id}`, JSON.stringify(array)) }

        // { console.log('being clicked'); }
    }

    return (

        // <Container>
        //     <table className='coin-list-heading'>
        //         <tbody>
        //             <tr>
        //                 <th>Name</th>
        //                 <th>Symbol</th>
        //                 <th>Price</th>
        //                 <th>Market Cap</th>
        //             </tr>
        //         </tbody>
        //     </table>
        <Container className='coin-maincont'>
            <Row className='coin-listsubcont'>
                <Col className='coinlist-image' xs={2}>
                    <img className='coin-image' src={coin.image} alt='symbol'></img>
                </Col>
                <Col className='coinlist-name' xs={2}>
                    <p>{coin.name}({coin.symbol})</p>
                </Col>
                {/* <Col xs={2}>
                    <p>{coin.symbol}</p>
                </Col> */}
                <Col className='coin-price' xs={8}>
                    Price:
                    <p>{coin.price.toLocaleString()}</p>
                    Market Cap:
                    <p>{coin.volume.toLocaleString()}</p>
                </Col>
                {/* <Col xs={2}>
                    <p>{coin.volume.toLocaleString()}</p>
                </Col> */}
            </Row>
            <Row>
                <div className="trackerlist-btn">
                    <button onClick={() => send(coin.id)}>Add to Tracker List</button>
                </div>
            </Row>
        </Container>
        // </Container>
    )
}

export default Coinlist