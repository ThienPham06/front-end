import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table, Progress, Input, InputGroup } from 'reactstrap';
import {withRouter} from 'react-router-dom';
import {approveRequest, rejectRequest, createTicket} from '../../util/API';
import swal from '@sweetalert/with-react';

class Plan extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isLoading:false,
            modal: this.props.modalFromList,
            ticketRequest: {
                planId:'', studentId:''
            },
            ticketCount:'',
            nestedModal:false,
            reason:''
        };
    }

    toggle = () => {
        this.props.modalCallbackFromList(!this.state.modal)
    }
    
    toggleNested = () => {
        this.setState({nestedModal:!this.state.nestedModal})
    }

    validateRegis = (count, quantity) => {
        var a = parseInt(count);
        if(a>=quantity)
            return true;
    }

    handleApprove = (event) => {
        event.preventDefault();
        if(sessionStorage.getItem("role")==='ADMIN'){
            approveRequest(this.props.plan.planId).then(res=>{
                if(res===true){
                    swal({
                        title: "Successfully!",
                        text: "Plan request has been approved! Now it's available!",
                        icon: "success",
                        button: "OK",
                      }).then(()=>{
                        this.toggle();
                        window.location.reload();
                      })
                }else{
                    swal({
                        title: "Error!",
                        text: "Oops...! Something went wrong! Plz try again!",
                        icon: "error",
                        button: "OK",
                      });
                }
            })
        }else{
            this.props.history.push("/notfound");
        }
    }

    handleReject = (event) => {
        event.preventDefault();
            rejectRequest(this.props.plan.planId, this.inputReason.value).then(res=>{
                if(res===true){
                    swal({
                        title: "Successfully!",
                        text: "Plan request has been rejected! ",
                        icon: "success",
                        button: "OK",
                      }).then(()=>{
                        this.toggle();
                        window.location.reload();
                      })
                }else{
                    swal({
                        title: "Error!",
                        text: "Oops...! Something went wrong! Plz try again!",
                        icon: "error",
                        button: "OK",
                      });
                }
            })
      
    }

    handleNestedReason = (event) => {
        event.preventDefault();
        if(sessionStorage.getItem("role")==='ADMIN'){
            this.toggleNested();
        }
        else{
            this.props.history.push("/notfound");
        }   
    }

    handleRegister = (event) => {
        event.preventDefault();
        const {ticketRequest} = this.state;
        ticketRequest.planId = this.props.plan.planId;
        ticketRequest.studentId = sessionStorage.getItem("id");
 
        if(sessionStorage.getItem("role")==='ADMIN'){
            this.props.history.push("/notfound");
        }else{
            if(this.validateRegis(this.props.count, this.props.plan.quantity)){
                swal({
                    title: "Warning!",
                    text: "This plan is full of waiting tickets and can not be registed! Refresh to looking for a chance!",
                    icon: "warning",
                    button: "OK",
                  })
            }else{
            createTicket(ticketRequest).then(res=>{ 
                if(res==="sc"){
                    swal({
                        title: "Successfully!",
                        text: "Registered plan successfully! Now waiting for the day! :)",
                        icon: "success",
                        button: "OK",
                      }).then(()=>{
                        this.toggle();
                        window.location.reload();
                      })
                }else if(res==="ex"){
                    swal({
                        title: "Error!",
                        text: "You registerd this plan before, please check again!",
                        icon: "error",
                        button: "OK",
                      }).then(()=>{
                        this.toggle();
                      })
                }else {
                    swal({
                        title: "Error!",
                        text: "Registered unsuccessfully! You had 2 tickets are waiting!",
                        icon: "error",
                        button: "OK",
                      }).then(()=>{
                        this.toggle();
                      })
                } 
            })
        }
        } 
    }

    handleCheck = (event) => {
        event.preventDefault();
        if(sessionStorage.getItem("role")==='ADMIN')
            this.props.history.push("/ticketpage");
        else if(sessionStorage.getItem("role")==='STUDENT')
            this.props.history.push("/notfound");
    }


    render() { 
            
        let button;
        if(this.props.plan.planState==='available'){
            button=<Button color="success" onClick={(e)=>this.handleRegister(e)}>Register</Button>
        }else if(this.props.plan.planState==='closed'){
            button=<Button color="danger" onClick={(e)=>this.handleCheck(e)}>Check</Button>
        }else{
            button=<div>
                <Button color="success" onClick={(e)=>this.handleApprove(e)}>Approve</Button>{" "}
                <Button color="danger" onClick={this.toggleNested}>Reject</Button>
            </div>
        }
        return ( 
            <Modal isOpen={this.props.modalFromList} toggle={this.toggle} fade={true} scrollable={true}>
                <ModalHeader>Plan detail</ModalHeader>
                <ModalBody>
                    <Table>
                    <tr>
                        <th>Plan ID: </th>
                        <th> {this.props.plan.planId}</th>
                    </tr>
                    <tr>
                        <th>Date: </th>
                        <th> {this.props.plandetail.plandDate} </th>
                    </tr>
                    <tr>
                        <th>Place:</th>
                        <th>{this.props.plandetail.plandPlace}</th>
                    </tr>
                    <tr>
                        <th>Status: </th>
                        <th>{this.props.plan.planState}</th>
                    </tr>
                    <tr>
                        <th>Số lượng dự kiến: </th>
                        <th>{this.props.plan.quantity}</th>
                    </tr>
                    <tr>
                        <th>Contact: </th>
                        <th>{this.props.plandetail.plandContact}</th>
                    </tr>
                    <tr>
                        <th>Tiến trình đăng ký: </th>
                        <th>
                            <p className="counter">{this.props.count}/{this.props.plan.quantity}</p>
                        </th>
                    </tr>
                    <tr>
                        <th></th>
                        <th>
                            <Progress bar color="success" value={this.props.count} 
                                    max={this.props.plan.quantity}>{this.props.count}/{this.props.plan.quantity}</Progress>
                        </th>
                    </tr>
                    </Table>
                </ModalBody>
                <ModalFooter>
                    {button}{" "}
                    <Button onClick={this.toggle}>Close</Button>
                </ModalFooter>
            <Modal fade={true} isOpen={this.state.nestedModal} toggle={this.toggleNested}>
                <ModalHeader>Input reject reason:</ModalHeader>
                <ModalBody>
                    <Input required type="text" className="reason" 
                            id="reason" 
                            placeholder="Reason" 
                            innerRef={x=>(this.inputReason=x)} />
                </ModalBody>
                <ModalFooter>
                    <Button color ="success" onClick={(e)=>{this.handleReject(e)}}>Continue</Button>
                    <Button onClick={this.toggleNested}>Cancel</Button>
                </ModalFooter>
            </Modal>
            </Modal>
        );
    }
}
 
export default withRouter(Plan);