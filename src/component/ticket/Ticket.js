import React, {Component} from 'react';
import {Modal, ModalBody, ModalHeader, ModalFooter, Button, Table} from 'reactstrap';
import {approveTicket, rejectTicket, getWaitingTickets} from '../../util/API';
import swal from '@sweetalert/with-react';

class Ticket extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            modal: this.props.modalFromList,
            flag: this.props.flagFromList,
            ntickets:[]
        }
    }

    toggle = () => {
        this.props.modalCallbackFromList(!this.state.modal);
        
    }

    loadWaitingTicketsByPlan = (planid) => {
        getWaitingTickets(planid).then(res=>{
            this.setState({ntickets:res});
        })
    }

    handleApprove = (e) => {
        e.preventDefault();
        approveTicket(this.props.ticket.ticketId, sessionStorage.getItem("id")).then(res=>{
            if(res===true){
                swal({
                    title: "Successfully!",
                    text: "Ticket has been approved!",
                    icon: "success",
                    button:"OK"
                  }).then(()=>{
                    this.toggle();
                  });
            }else{
                swal({
                    title: "Oops...!",
                    text: "Something went wrong! Plz try again",
                    icon: "error",
                    button:"OK"
                  })
            }
        });
    }

    handleReject = (e) => {
        e.preventDefault();
        rejectTicket(this.props.ticket.ticketId, sessionStorage.getItem("id")).then(res=>{
            if(res===true){
                swal({
                    title: "Successfully!",
                    text: "Ticket has been rejected!",
                    icon: "success",
                    button:"OK"
                  }).then(()=>{
                    this.toggle();
                  });
            }else{
                swal({
                    title: "Oops...!",
                    text: "Something went wrong! Plz try again",
                    icon: "error",
                    button:"OK"
                  })
            }
        });
    }

    render() { 
        return ( 
        <Modal isOpen={this.props.modalFromList} toggle={this.toggle}>
            <ModalHeader>Ticket detail</ModalHeader>
            <ModalBody>
                <Table>
                    <tr>
                        <th>Ticket ID: </th>
                        <th>{this.props.ticket.ticketId}</th>
                    </tr>
                    <tr>
                        <th>Student ID: </th>
                        <th>{this.props.student.studentId}</th>
                    </tr>
                    <tr>
                        <th>Created date: </th>
                        <th>{this.props.ticket.ticketCreatedTime}</th>
                    </tr>
                </Table>
            </ModalBody>
            <ModalFooter>
                <Button color="success" onClick={(e)=>{this.handleApprove(e)}}>Approve</Button>
                <Button color="danger" onClick={(e)=>{this.handleReject(e)}}>Reject</Button>
                <Button onClick={this.toggle}>Close</Button>
            </ModalFooter>
        </Modal>
        );
    }
}
 
export default Ticket;