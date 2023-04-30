import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState';
import TrackerList from '../Pages/TrackerList'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Coinlist = ({ key, image, name, symbol, price, volume }) => {

    // const addToList = () => {
    //     <TrackerList
    //         name={name}
    //     />
    //     { console.log('Added'); }
    // }

    const {
        addCryptoToTrackList
    } = useContext(GlobalContext)

    return (

        <Container>
            <Row className='coin-list-cont'>
                <Col xs={2}>
                    <img className='coin-image' src={image} alt='symbol'></img>
                </Col>
                <Col xs={2}>
                    <p>{name}</p>
                </Col>
                <Col xs={2}>
                    <p>{symbol}</p>
                </Col>
                <Col xs={2}>
                    <p>{price}</p>
                </Col>
                <Col xs={2}>
                    <p>{volume.toLocaleString()}</p>
                </Col>
            </Row>
            <Row>
                <div className="trackerlist-btn">
                    <button onClick={() => addCryptoToTrackList(key)}>Add to Tracker List</button>
                </div>
            </Row>
        </Container>

        // <div className="coin-cont row">

        //     <div className="coin-list">
        //         <div className="col">
        //             <img className='coin-image' src={image} alt='symbol'></img>
        //         </div>
        //         <div className="col">
        //             <h1>{name}</h1>
        //         </div>
        //         <div className="col">
        //             <p>{symbol}</p>
        //         </div>
        //         <div className="col">
        //             <p>{price}</p>
        //         </div>
        //         <div className="col">
        //             <p>{volume.toLocaleString()}</p>
        //         </div>
        //     </div>

        //     <div className="trackerlist-btn">
        //         <button onClick={addToList}>Add to Tracker List</button>
        //     </div>

        // </div>
    )
}

export default Coinlist