import React from 'react'
import TrackerList from '../Pages/TrackerList'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Coinlist = ({ image, name, symbol, price, volume }) => {

    const addToList = () => {
        <TrackerList
            name={name}
        />
        { console.log('Added'); }
    }

    return (

        <Container>
            <Row>
                <Col xs={2}>
                    <img className='coin-image' src={image} alt='symbol'></img>
                </Col>
                <Col xs={2}>
                    <h1>{name}</h1>
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