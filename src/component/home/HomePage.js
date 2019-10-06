import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import SlideShow from '../sildeshow/SlideShow';
import './HomePage.css';
import { Container, Row, Col, Button } from 'reactstrap';
import NavBar from '../navbar/NavBar';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            item: []
        }
    }

    render() { 
        return ( 
    <div>
        <NavBar />
        <SlideShow />
        <Container>
            <Row className="blank"></Row>
            <Row>
                <Col xs="6">

                </Col>
                <Col xs="6">
                    <Button className='addButton'>REGISTER PLAN</Button>
                    <Button className='confirmButton'>CONFIRM TICKET</Button>
                </Col>
            </Row>
        </Container>
    </div>

         );
    }
}
 
export default withRouter(HomePage);