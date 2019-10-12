import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {withRouter} from 'react-router-dom';
import NavBar from '../navbar/NavBar';
import './PlanRequest.css'

class PlanRequest extends Component {
    constructor(props) {
        super(props);
        this.state = { 
       
        }
    }

    render() { 
        return ( 
        <div>
            <NavBar /><br></br>
            <div  className='title'><Label>Create a plan request:</Label></div>
            <Form>
                <FormGroup row>
                    <Label for="planId" sm={4}>Plan ID: </Label>
                    <Col sm={10}>
                        <Input type="text" id="planId" placeholder="Plan id. Example: 'PL01'" />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="planDate" sm={4}>Date: </Label>
                    <Col sm={10}>
                        <Input type="Date" id="planDate" placeholder="Date held" />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="planPlace" sm={4}>Place: </Label>
                    <Col sm={10}>
                        <Input type="textarea" id="planPlace" placeholder="Venue" />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="creatorID" sm={4}>Creator id: </Label>
                    <Col sm={10}>
                        <Input disabled type="text" id="creatorID" placeholder="Plan's creator id" value={sessionStorage.getItem("id")} />      
                    </Col>
                </FormGroup>
                <FormGroup className='buttonGr'>
                    <Button color="success">Submit</Button>{" "}
                    <Button >Cancel</Button>
                </FormGroup>
            </Form>
            </div>
        );
    }
}
 
export default withRouter(PlanRequest);