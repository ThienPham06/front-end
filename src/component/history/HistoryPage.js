import React, {Component } from 'react';
import {withRouter} from 'react-router-dom';
import NavBar from '../navbar/NavBar';
import ActionButton from '../action_button/ActionButton';
import { ListGroup, ListGroupItem, Container, Row, Col, Button } from 'reactstrap';
import {getClosedPlansCreateByAdmin, getWaitingPlansCreateByAdmin, getApprovedPlanByChecker} from "../../util/API";

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
            closedlg = <ListGroup><ListGroupItem>You haven't created any plan that closed...</ListGroupItem></ListGroup>
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
            waitinglg = <ListGroup><ListGroupItem>You haven't created any plan that waiting...</ListGroupItem></ListGroup>
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
            approvedlg = <ListGroup><ListGroupItem>You haven't checked any plan...</ListGroupItem></ListGroup>
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
        <div>
            <NavBar planCounting = {sessionStorage.getItem("wtPlan")}
                    closedPlanCounting={sessionStorage.getItem("clPlan")}
            /><br></br>
            <ActionButton /><br></br>
            <div className="xxx">
                <Container>
                    <Row>
                        <Col xs="4">Closed plans you created: 
                            {closedlg}
                        </Col>
                        <Col xs="4">Your waiting request:
                            {waitinglg}
                        </Col>
                        <Col xs="4">Plans that you checked:
                            {approvedlg}
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
        );
    }
}
 
export default withRouter(HistoryPage);