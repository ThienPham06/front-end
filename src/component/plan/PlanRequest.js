import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {withRouter} from 'react-router-dom';
import NavBar from '../navbar/NavBar';
import './PlanRequest.css';
import { createRequest } from '../../util/API';
import swal from '@sweetalert/with-react';

class PlanRequest extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            planRequest:{
                planId:'', date:'', venue:'', contact:'', creatorId:''
            },
            errors:{
                planid:'',
                date:''
            }
        }
    }

    getValidStringDate = (days) => {
        var result = new Date();
        result.setDate(result.getDate() + days);
        var day = result.getDate();
        var month = result.getMonth() + 1;
        var year = result.getFullYear();
        return year + '-' + month + '-' + day;
    }

    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        var valid = this.getValidStringDate(14);
        var input = this.dateInput.value;
        let errors = this.state.errors;
        switch(name){
            case 'planId':
                errors.planid = value.length > 5 ? 'Plan ID must less than 5 characters!' : '';
                break;
            case 'planDate':
                errors.date = Date.parse(input) <= Date.parse(valid) ? 'Date have to be 14 days more from today!' : ''; 
                break;
        }
        this.setState({errors, [name]: value});

    }

    handleSubmit = (event) => {
        event.preventDefault();

        const {planRequest} = this.state;
        planRequest.planId=this.idInput.value;
        planRequest.date=this.dateInput.value;
        planRequest.contact=this.contactInput.value;
        planRequest.venue=this.venueInput.value;
        planRequest.creatorId=sessionStorage.getItem("id");

        createRequest(planRequest).then(res=>{
            if(res===true){
                this.props.history.push('/planpage');
                swal({
                    title: "Successfully!",
                    text: "Plan request has been created!",
                    icon: "success",
                    button: "OK",
                  });
            } else {
                swal({
                    title: "Error!",
                    text: "Plan request id is existing!",
                    icon: "error",
                    button: "Try again",
                  })
            }
        }).catch(err=>{
            console.log(err);      
        })
    
    }

    render() { 
        const {errors} = this.state;
        let subBut;
        if(errors.date.length>0 || errors.planid.length>0){
            subBut = <Button disabled>Submit</Button>
        }else{
            subBut = <Button color='success' onClick={(e)=>this.handleSubmit(e)}>Submit</Button>
        }
        return ( 
        <div>
            <NavBar planCounting={sessionStorage.getItem("wtPlan")}/><br></br>
            <div  className='title'><Label>Create a plan request:</Label></div>
            <Form>
                <FormGroup row>
                    <Label for="planId" sm={4}>Plan ID: </Label>
                    <Col sm={10}>
                        <Input
                            type="text" 
                            name="planId" 
                            id="planId" 
                            placeholder="Plan id. Example: 'PL01'"
                            innerRef={x=>(this.idInput=x)}
                            onChange={(e)=>this.handleChange(e)}  required/>
                        {errors.planid.length>0 && <div className='err'><span>{errors.planid}</span></div>}
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="planDate" sm={4}>Date: </Label>
                    <Col sm={10}>
                        <Input required type="date" name="planDate" id="planDate" 
                            placeholder="Date held"
                            innerRef={x=>(this.dateInput=x)} 
                            onChange={(e)=>this.handleChange(e)}
                            />
                         {errors.date.length>0 && <div className='err'><span>{errors.date}</span></div>}
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="planPlace" sm={4}>Place: </Label>
                    <Col sm={10}>
                        <Input required type="textarea" 
                            name="planPlace" 
                            id="planPlace" 
                            placeholder="Venue"
                            innerRef={x=>(this.venueInput=x)} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="planContact" sm={4}>Contact: </Label>
                    <Col sm={10}>
                        <Input required type="text" name="planContact" 
                            id="planContact" 
                            placeholder="For contact" 
                            innerRef={x=>(this.contactInput=x)}
                            />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="creatorID" sm={4}>Creator id: </Label>
                    <Col sm={10}>
                        <Input required disabled type="text" id="creatorID" 
                            placeholder="Plan request's creator id" 
                            value={sessionStorage.getItem("id")}/>      
                    </Col>
                </FormGroup>
                <FormGroup className='buttonGr'>
                    {subBut} {' '}
                    <Button href='/planpage' >Cancel</Button>
                </FormGroup>
            </Form>
            </div>
        );
    }
}
 
export default withRouter(PlanRequest);