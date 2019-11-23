import React, {Component } from 'react';
import {withRouter} from 'react-router-dom';
import {getPlanByState, getWaitingTickets, getStudentByTicket} from '../../util/API';
import {ListGroup, ListGroupItem, Container, Row, Col, Button, Toast, ToastHeader, ToastBody} from 'reactstrap';
import NavBar from '../navbar/NavBar';
import ActionButton from '../action_button/ActionButton';
import './TicketPage.css';
import Ticket from './Ticket';
import _ from 'lodash';
import { Footer } from '../footer/Footer';
import Scanner from '../scanner/Scanner';

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
            modalscan:false,
            student:[],
            reloadTicket :false,
            scanning:false,
            results:'',
            l_results:[] 
         }
    }

    modalCallback = (modalFromTicket) => {
        this.setState({modal: !modalFromTicket})
    }

    _scan = () => {
        this.setState({ scanning: !this.state.scanning })
      }
    
      _onDetected = result => {
        // this.setState({ results: this.state.results.concat([result]) });
        this.setState({results:result.codeResult.code})
        this.state.l_results.push(result.codeResult.code)
        // console.log(this.state.results)
      }

    handleToggle=(e)=>{
        e.preventDefault();
        this.setState(prevState => ({
            modal: !prevState.modal,
          }));
    };

    handleScannerBox = (e)=>{
        e.preventDefault();
        this.setState(prevState => ({
            modalscan: !prevState.modalscan,
          }));        
    }

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


    render() { 
        let planlistgrp;
        if(this.state.plans.length===0)
            planlistgrp = <ListGroup><ListGroupItem>Không có lịch hiến máu đã đóng...</ListGroupItem></ListGroup>
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
                    }       
                }>
                   Mã số: { plan.planId }    
                </ListGroupItem>);
            })}
            </ListGroup>;

        let ticketlistgrp;
        if(this.state.tickets.length===0)
            ticketlistgrp = <ListGroup><ListGroupItem>Không có phiếu đăng kí tham gia nào...</ListGroupItem></ListGroup>
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
                        Mã số phiếu: { ticket.ticketId}
                    </ListGroupItem>
                );
            })}
        </ListGroup>;

        return ( 
        <div className="ticketpage">
            <NavBar planCounting = {sessionStorage.getItem("wtPlan")}
                    closedPlanCounting={sessionStorage.getItem("clPlan")}
            /><br></br>
            <ActionButton /><br></br>
            <div className="listPlan">
                <Container>
                    <Row>
                        <Col xs="6">Lịch hiến máu đã đóng:
                            {planlistgrp}
                        </Col>
                        <Col xs="6">Các phiếu đăng kí tham gia cần xác nhận:
                            {ticketlistgrp}
                        </Col>
                    </Row> <br></br><br></br>     
                    <Row>
                        <Col xs="6">
                            {this.state.scanning ? <Scanner onDetected={this._onDetected} /> : null}
                        </Col>
                        <Col xs="6">{this.state.scanning ? 'Kết quả quét:' : ''}
                            {/* {this.state.results} */}
                            <ListGroup>{this.state.l_results.map((res, index)=>{
                                return(<ListGroupItem>{res}</ListGroupItem>)
                            })}
                            </ListGroup>
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
            
            <div className='scanbtn' ><Button color='success' onClick={this._scan}>Scan</Button></div>
            <Footer />


        </div>
        );
    }
}
 
export default withRouter(TicketPage);