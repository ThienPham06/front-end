import React, {Component } from 'react';
import {withRouter} from 'react-router-dom';
import NavBar from '../navbar/NavBar';
import ActionButton from '../action_button/ActionButton';
import { ListGroup, ListGroupItem, Container, Row, Col, Button } from 'reactstrap';

class HistoryPage extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
        <div>
            <NavBar planCounting = {sessionStorage.getItem("wtPlan")}
                    closedPlanCounting={sessionStorage.getItem("clPlan")}
            /><br></br>
            <ActionButton /><br></br>
            <div className="xxx">
                <Container>
                    <Row>
                        <Col xs="4">Closed plans you created: 
                            
                        </Col>
                        <Col xs="4">Your waiting request:
                            
                        </Col>
                        <Col xs="4">Plans that you checked:
                            
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
        );
    }
}
 
export default withRouter(HistoryPage);