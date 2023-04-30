import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const TrackerList = ({ name }) => {
  return (

    <div className="tracker-list-cont">
      <div className="tracker-list">
        HERE WE WILL HAVE ALL THE TRACKED USER INVESTMENTS

        {name}

      </div>
    </div>
  )
}

export default TrackerList