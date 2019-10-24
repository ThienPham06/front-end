import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import NavBar from '../navbar/NavBar';
import { ListGroup, ListGroupItem, Container, Row, Col, Button } from 'reactstrap';
import { getPlanByState, getPlandetailByPlanId } from '../../util/API';
import './PlanPage.css'
import Plan from './Plan';

class PlanPage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isLoading: false,
            availablePlans: [],
            expiredPlans: [],
            waitingPlans: [],
            plan: [],
            plandetail:[],
            planid:'',
            modal: false,
            role:'',
            planCount:''
        }
    };

    handleToggle=(e)=>{
        e.preventDefault();
        this.setState(prevState => ({
            modal: !prevState.modal,
          }));
    };

    loadPlandetail = (id) => {
        getPlandetailByPlanId(id).then(response=>{
            this.setState({plandetail: response})
        })
    }

    loadAvailablePlans=()=>{
        getPlanByState("available").then(response => {
            this.setState({availablePlans: response});
        })
    };

    loadExpiredPlans=()=>{
        getPlanByState("expired").then(response => {
            this.setState({expiredPlans: response});
        })
    };

    loadWaitingPlans=()=>{
        getPlanByState("waiting").then(response => {
            this.setState({waitingPlans: response});
            this.setState({planCount:response.length});
            sessionStorage.setItem("wtPlan", response.length);
        })
    };

    componentDidMount(){
        this.loadAvailablePlans();
        this.loadExpiredPlans();
        this.loadWaitingPlans();
        this.setState({role: sessionStorage.getItem("role")}); 
        sessionStorage.setItem("wtPlan",this.state.planCount);
    };

    modalCallback = (modalFromPlan) => {
        this.setState({modal: !modalFromPlan})
    }

    render() { 
        let button;
        if(this.state.role==="ADMIN")
            button = <Button size="lg" color="success" href="/planpage/create">Create request</Button>;
        else
            button = <Button size="lg" color="success" href="/notfound">Create request</Button>;
        return (
        <div>
            <NavBar planCounting = {this.state.planCount}/>
            <div>
            <Container>
                <Row>
                    <Col xs="6" sm="4"> Waiting plans
                        <ListGroup>
                            {this.state.waitingPlans.map((plan, index)=>{
                                return(<ListGroupItem key={index} onClick={(e)=>{
                                    this.handleToggle(e);
                                    this.setState({plan: plan});                             
                                    this.loadPlandetail(plan.planId)}} >
                                    { plan.planId }
                                </ListGroupItem>
                                );
                            })}
                        </ListGroup>
                    </Col>
                    <Col xs="6" sm="4"> Available plans
                        <ListGroup>
                            {this.state.availablePlans.map((plan, index)=>{
                                return(<ListGroupItem key={index} onClick={(e)=>{
                                    this.handleToggle(e);
                                    this.setState({plan: plan});
                                    this.loadPlandetail(plan.planId)}}>
                                    { plan.planId }
                                </ListGroupItem>);
                            })}
                        </ListGroup>
                    </Col>
                    <Col sm="4"> Expired plans
                        <ListGroup>
                            {this.state.expiredPlans.map((plan, index)=>{
                                return(<ListGroupItem key={index} onClick={(e)=>{
                                    this.handleToggle(e);
                                    this.setState({plan: plan});
                                    this.loadPlandetail(plan.planId)}}>
                                    { plan.planId } 
                                </ListGroupItem>);
                            })}
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
            </div><br></br>
            <div className="buttonGroup">
                {button}
            </div>
            <Plan   modalFromList={this.state.modal}
                    plan={this.state.plan} 
                    plandetail={this.state.plandetail} 
                    modalCallbackFromList={this.modalCallback.bind(this)}
            />
        </div>
        );
    }
}
 
export default withRouter(PlanPage);