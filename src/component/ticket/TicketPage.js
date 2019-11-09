import React, {Component } from 'react';
import {withRouter} from 'react-router-dom';
import {getPlanByState, getWaitingTickets, getStudentByTicket} from '../../util/API';
import {ListGroup, ListGroupItem, Container, Row, Col} from 'reactstrap';
import NavBar from '../navbar/NavBar';
import ActionButton from '../action_button/ActionButton';
import './TicketPage.css';
import Ticket from './Ticket';
import _ from 'lodash';

class TicketPage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            plans:[],
            plan:[],
            tickets:[],
            ticket:[],
            dropRight:false,
            modal: false,
            student:[],
            reloadTicket :false
         }
    }

    modalCallback = (modalFromTicket) => {
        this.setState({modal: !modalFromTicket})
    }

    // ticketCallback = (newtickets) => {
    //     this.setState({tickets:newtickets})
    // }

    handleToggle=(e)=>{
        e.preventDefault();
        this.setState(prevState => ({
            modal: !prevState.modal,
          }));
    };

    loadClosedPlans=()=>{
        getPlanByState("closed").then(response => {
            this.setState({plans: response});
        })
    };

    loadWaitingTicketsByPlan = (planid) => {
        getWaitingTickets(planid).then(res=>{
            this.setState({tickets:res});
        })
    }

    loadStudentByTicketId = (id) => {
        getStudentByTicket(id).then(res=>{
            this.setState({student:res})
        })
    }

    componentDidMount(){
        this.loadClosedPlans();
    }

    // componentWillUpdate(){
    //     this.loadWaitingTicketsByPlan(this.state.plan.planId);
    // }

    render() { 
        let planlistgrp;
        if(this.state.plans.length===0)
            planlistgrp = <ListGroup><ListGroupItem>Do not have any closed plan yet...</ListGroupItem></ListGroup>
        else
            planlistgrp =
            <ListGroup>
                {this.state.plans.map((plan, index)=>{
                return(
                <ListGroupItem id="plan-item" className={plan.className} key={index} 
                // onMouseMove={}
                onClick={(e)=>{
                    this.loadWaitingTicketsByPlan(plan.planId);
                    this.setState({plan: plan});
                    let idx = _.findIndex(this.state.plans, function(p){
                        return p.planId === plan.planId;
                    });
                    this.setState(state => {
                     const list = state.plans.map((p, j) => {
                        if (j === idx) {
                            return p.className = "list-group-item1";
                        } else {
                             return p.className = ' ';
                         }
                    });
                 return {
                    list,
                    };
                });
                    
                    // document.getElementById("wwq").setAttribute("class", "list-group-itewm");
                    }
                
                }>
                    { plan.planId } 
                   
                </ListGroupItem>);
            })}
            </ListGroup>;

        let ticketlistgrp;
        if(this.state.tickets.length===0)
            ticketlistgrp = <ListGroup><ListGroupItem>This plan do not have any ticket yet...</ListGroupItem></ListGroup>
        else
            ticketlistgrp =
            <ListGroup>
            { this.state.tickets.map((ticket, index) => {
                return(
                    <ListGroupItem key={index} onClick = {(e)=>{
                        this.handleToggle(e);
                        this.setState({ticket:ticket});
                        this.loadStudentByTicketId(ticket.ticketId);
                    }}>
                        {ticket.ticketId}
                    </ListGroupItem>
                );
            })}
        </ListGroup>;

        return ( 
        <div>
            <NavBar planCounting = {sessionStorage.getItem("wtPlan")}
                    closedPlanCounting={sessionStorage.getItem("clPlan")}
            /><br></br>
            <ActionButton /><br></br>
            <div className="listPlan">
                <Container>
                    <Row>
                        <Col xs="6">Closed plans with tickets:
                            {planlistgrp}
                        </Col>
                        <Col xs="6">Waiting tickets need to be checked:
                            {ticketlistgrp}
                        </Col>
                    </Row>
                </Container>
            </div>
            <Ticket modalFromList={this.state.modal}
                    modalCallbackFromList={this.modalCallback.bind(this)}
                    // ticketsCallbackFromList={this.ticketCallback.bind(this)}
                    ticket={this.state.ticket}
                    student={this.state.student} 
                    planid={this.state.plan.planId}
                    />
        </div>
        );
    }
}
 
export default withRouter(TicketPage);