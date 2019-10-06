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
        }
        this.loadAvailablePlans = this.loadAvailablePlans.bind(this)
        this.loadExpiredPlans = this.loadExpiredPlans.bind(this)
        this.loadWaitingPlans = this.loadWaitingPlans.bind(this)
        this.handleToggle = this.handleToggle.bind(this)
    };

    handleToggle(e){
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

    loadAvailablePlans(){
        getPlanByState("available").then(response => {
            this.setState({availablePlans: response});
        })
    };

    loadExpiredPlans(){
        getPlanByState("expired").then(response => {
            this.setState({expiredPlans: response});
        })
    };

    loadWaitingPlans(){
        getPlanByState("").then(response => {
            this.setState({waitingPlans: response});
        })
    };

    componentDidMount(){
        this.loadAvailablePlans();
        this.loadExpiredPlans();
        this.loadWaitingPlans();
        // this.loadPlandetail();
    };

    render() { 
        return (
        <div>
            <NavBar />
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
                <Button size="lg" color="success">Add</Button>
            </div>
            <Plan modalFromList={this.state.modal}
             plan={this.state.plan} plandetail={this.state.plandetail}/>
        </div>
        );
    }
}
 
export default withRouter(PlanPage);