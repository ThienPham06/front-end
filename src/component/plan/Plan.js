import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import {withRouter} from 'react-router-dom';
// import NavBar from '../navbar/NavBar';
// import { getPlandetailByPlanId } from '../../util/API';

class Plan extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isLoading:false,
            modal: this.props.modalFromList
        };
    }

    toggle = () => {
        this.props.modalCallbackFromList(!this.state.modal);
    }


    render() { 
        let button;
        if(this.props.plan.planState==='available'){
            button=<Button color="success">Register</Button>
        }else if(this.props.plan.planState==='expired'){
            button=<Button color="danger">Delete</Button>
        }else{
            button=<div>
                <Button color="success">Approve</Button>{" "}
                <Button color="danger">Reject</Button>
            </div>
        }
        return ( 
            <Modal isOpen={this.props.modalFromList} toggle={this.toggle} >
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
                        <th>Contact: </th>
                        <th>{this.props.plandetail.plandContact}</th>
                    </tr>
                    </Table>
                </ModalBody>
                <ModalFooter>
                    {button}{" "}
                    <Button onClick={this.toggle}>Close</Button>
                </ModalFooter>
            </Modal>
        );
    }
}
 
export default withRouter(Plan);