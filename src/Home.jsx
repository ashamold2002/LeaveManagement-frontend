import React from 'react';
import HomeHeader from './HomeHeader';
import './Home.css';
import { Col, Container,Row} from 'react-bootstrap';


function Home() {
  return (
    <>
    <Container >
    <Row>
        <HomeHeader/>
    </Row>
    <Row className='HomeBackground'>
    <Col xs={12} md={4} className='bgHeading text-center align-items-center justify-content-center'>
        <h1>Leave Management System</h1>
      </Col>
      <Col xs={12} md={8} className='bgImg'>
        
      </Col>
      

    </Row>
    
    </Container>
    
    </>
  )
}

export default Home