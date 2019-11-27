import React, {Component } from 'react';
import {withRouter} from 'react-router-dom';
import NavBar from '../navbar/NavBar';
import ActionButton from '../action_button/ActionButton';
import { ListGroup, ListGroupItem, Container, Row, Col } from 'reactstrap';
import { Footer } from '../footer/Footer';
import {getPlansByStudent, getWaitingTicketsByStudent} from "../../util/API";
import './HistoryPage.css';

class StHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            waitingTickets:[],
            plans:[]
        }
    }

    loadPlansByStudent = () => {
        getPlansByStudent(sessionStorage.getItem('id')).then(res=>{
            this.setState({plans:res})
        })
    }

    loadWaitingTicketByStudent = () => {
        getWaitingTicketsByStudent(sessionStorage.getItem('id')).then(res=>{
            this.setState({waitingTickets:res})
        })
    }

    componentDidMount(){
        this.loadPlansByStudent();
        this.loadWaitingTicketByStudent();
    }

    render() { 
        let listplans;
        if(this.state.plans.length===0)
            listplans = <ListGroup><ListGroupItem>Bạn chưa đăng kí tham gia đợt hiến máu nào...</ListGroupItem></ListGroup>
        else
            listplans =
             <ListGroup> {this.state.plans.map((plan, index)=>{
                 return(
                     <ListGroupItem key={index}>
                        Mã số lịch: { plan.planId}
                     </ListGroupItem>
                 )
             })}
             </ListGroup>
             
        let listticket;
        if(this.state.waitingTickets.length===0)
             listticket = <ListGroup><ListGroupItem>Bạn hiện không có phiếu đăng kí nào đợi xác nhận...</ListGroupItem></ListGroup>
        else
             listticket = 
             <ListGroup> {this.state.waitingTickets.map((ticket, index)=>{
                return(
                    <ListGroupItem key={index}>
                       Mã số phiếu: { ticket.ticketId}
                    </ListGroupItem>
                )
            })}
            </ListGroup>             
             return ( 
        <div className="hpage">
            <NavBar planCounting = {sessionStorage.getItem("wtPlan")}
                    closedPlanCounting={sessionStorage.getItem("clPlan")}
            /><br></br>
            <ActionButton /><br></br>
            <div className="main">
                <Container>
                    <Row>
                        <Col xs="4">Phiếu đang đợi xác nhận:
                            {listticket}
                        </Col>
                        <Col xs="4">Các đợt hiến máu bạn đã đăng kí: 
                            {listplans}
                        </Col>
                        <Col xs="4">
                           
                        </Col>
                    </Row>
                </Container>
            </div>   
            <Footer />         
        </div>
        );
    }
}
 
export default withRouter(StHistory);