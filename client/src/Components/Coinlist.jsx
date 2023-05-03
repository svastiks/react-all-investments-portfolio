import React, { useContext, useState, useEffect } from 'react'
import { GlobalContext } from '../context/GlobalState';
import TrackerList from '../Pages/TrackerList'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { isDisabled } from '@testing-library/user-event/dist/utils';


const Coinlist = (coin) => {

    const [isDisabled, setDisabled] = useState(false);
    const [isDisabledRemove, setDisabledRemove] = useState(false);


    const send = () => {
        const array = [coin.id, coin.image, coin.name, coin.symbol, coin.price, coin.volume];
        localStorage.setItem(`${coin.id}`, JSON.stringify(array));
        //console.log('Works');

        if (localStorage.getItem(coin.id) != null) {
            setDisabled(true);
            setDisabledRemove(false);
            //console.log('Disabled');
        }
        else {
            setDisabled(false);
            setDisabledRemove(false);
        }
    }

    const removeCoin = (id) => {
        localStorage.removeItem(id);

        // window.location.reload(true);
    }

    useEffect(() => {
        setDisabled(localStorage.getItem(coin.id) !== null)
    }, [coin.id])

    return (

        <Container className='coin-maincont'>
            <Row className='coin-listsubcont'>
                <Row>
                    <Col className='coinlist-image' xs={2}>
                        <img className='coin-image' src={coin.image} alt='symbol'></img>
                    </Col>
                    <Col className='coinlist-name' xs={2}>
                        <p>{coin.name}({coin.symbol})</p>
                    </Col>
                    <Col xs={12}>
                        <button id='add-btn' className={isDisabled ? "disabled-button" : "trackerlist-btn"} onClick={() => send(coin)} disabled={isDisabled}>Track</button>
                        <button id='remove-btn' className={isDisabledRemove ? "disabled-button-remove" : "trackerlist-delete-btn"} onClick={() => removeCoin(coin.id)} disabled={!isDisabled}>Remove</button>
                    </Col>
                </Row>
                {/* <Col xs={2}>
                    <p>{coin.symbol}</p>
                </Col> */}
                <Row>
                    <Col className='coin-price' xs={5}>
                        <span className='price-heading'>Price</span>
                        <br />
                        {coin.price.toLocaleString()} CAD
                    </Col>
                    <Col className='coin-price' xs={4}>
                        <span className='marketcap-heading'>Market Cap</span>
                        <br />
                        {coin.volume.toLocaleString()}
                    </Col>
                </Row>
                {/* <Col xs={2}>
                    <p>{coin.volume.toLocaleString()}</p>
                </Col> */}
            </Row>
            {/* <Row>
                <div className="trackerlist-btn">
                    <button onClick={() => send(coin.id)}>Add to Tracker List</button>
                </div>
            </Row> */}
        </Container >
        // </Container>
    )
}

export default Coinlist