import React, {Component } from 'react';
import {withRouter} from 'react-router-dom';
import NavBar from '../navbar/NavBar';
import ActionButton from '../action_button/ActionButton';
import { ListGroup, ListGroupItem, Container, Row, Col } from 'reactstrap';
import {getClosedPlansCreateByAdmin, getWaitingPlansCreateByAdmin, getApprovedPlanByChecker} from "../../util/API";
import { Footer } from '../footer/Footer';
import './HistoryPage.css';

class HistoryPage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            closedPlans:[],
            waitingPlans:[],
            approvedPlans:[]
         }
    }

    loadClosedPlanByAdmin = () => {
        getClosedPlansCreateByAdmin(sessionStorage.getItem("id")).then(res=>{
            this.setState({closedPlans:res})
        })
    }

    loadWaitingPlanByAdmin = () => {
        getWaitingPlansCreateByAdmin(sessionStorage.getItem("id")).then(res=>{
            this.setState({waitingPlans:res})
        })
    }

    loadApprovedPlanByChecker = () => {
        getApprovedPlanByChecker(sessionStorage.getItem("id")).then(res=>{
            this.setState({approvedPlans:res})
        })
    }

    componentDidMount(){
        this.loadClosedPlanByAdmin()
        this.loadWaitingPlanByAdmin()
        this.loadApprovedPlanByChecker()
    }

    render() { 
        let closedlg;
        let waitinglg;
        let approvedlg;

        if(this.state.closedPlans.length===0)
            closedlg = <ListGroup><ListGroupItem>Bạn chưa có lịch đã đóng nào ...</ListGroupItem></ListGroup>
        else
            closedlg = 
                <ListGroup> {this.state.closedPlans.map((plan, index)=>{
                    return (
                        <ListGroupItem key={index}>
                            {plan.planId}
                        </ListGroupItem>
                    )
                })}
                </ListGroup>

        if(this.state.waitingPlans.length===0)
            waitinglg = <ListGroup><ListGroupItem>Bạn chưa có lịch nào đang đợi xác nhận...</ListGroupItem></ListGroup>
        else
            waitinglg = 
                <ListGroup> {this.state.waitingPlans.map((plan, index)=>{
                    return (
                        <ListGroupItem key={index}>
                            {plan.planId}
                        </ListGroupItem>
                    )
                })}
                </ListGroup>        

        if(this.state.approvedPlans.length===0)
            approvedlg = <ListGroup><ListGroupItem>Bạn chưa xác nhận hoặc hủy lịch nào...</ListGroupItem></ListGroup>
        else
            approvedlg = 
                <ListGroup> {this.state.approvedPlans.map((plan, index)=>{
                    return (
                        <ListGroupItem key={index}>
                            {plan.planId}
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
            <div className="xxx">
                <Container>
                    <Row>
                        <Col xs="4">Lịch đã đóng do bạn tạo: 
                            {closedlg}
                        </Col>
                        <Col xs="4">Yêu cầu tạo lịch của bạn đang đợi xác nhận:
                            {waitinglg}
                        </Col>
                        <Col xs="4">Lịch bạn đã xác nhận hoặc hủy bỏ:
                            {approvedlg}
                        </Col>
                    </Row>
                </Container>
            </div>
            <Footer />
        </div>
        );
    }
}
 
export default withRouter(HistoryPage);