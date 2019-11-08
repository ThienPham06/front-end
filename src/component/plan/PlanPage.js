import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import NavBar from '../navbar/NavBar';
import { ListGroup, ListGroupItem, Container, Row, Col, Button } from 'reactstrap';
import { getPlanByState, getPlandetailByPlanId, countWaitingTicket } from '../../util/API';
import './PlanPage.css'
import Plan from './Plan';
import LoadingSpinner from '../spinner/LoadingSpinner';
import ActionButton from '../action_button/ActionButton';

class PlanPage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isLoading: true,
            availablePlans: [],
            closedPlans: [],
            waitingPlans: [],
            plan: [],
            plandetail:[],
            planid:'',
            modal: false,
            role:'',
            ticketCount:''
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

    loadClosedPlans=()=>{
        getPlanByState("closed").then(response => {
            this.setState({closedPlans: response});
            this.setState({closedPlanCount:response.length});
            sessionStorage.setItem("clPlan", response.length);
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
        this.loadClosedPlans();
        this.loadWaitingPlans();
        this.setState({role: sessionStorage.getItem("role")}); 
        sessionStorage.setItem("wtPlan",this.state.planCount);
        this.setState({isLoading:false});
        
    };

    modalCallback = (modalFromPlan) => {
        this.setState({modal: !modalFromPlan})
    }

    ticketProgress = (planid) => {
        countWaitingTicket(planid)
        .then(response=>{
            this.setState({ticketCount: JSON.stringify(response.data)});
        })
    }

    render() { 
        let button;
        let listgrpwt;
        let listgrpav;
        let listgrpcl;
        if(this.state.role==="ADMIN")
            button = <div className="buttonGroup"><Button size="lg" color="success" href="/planpage/create">Create request</Button></div>;
        else
            button = <Button size="lg" color="success" href="/notfound">Create request</Button>;
        
        if(this.state.waitingPlans.length===0)
            listgrpwt = <ListGroup><ListGroupItem>Do not have any waiting plan yet...</ListGroupItem></ListGroup>
        else
            listgrpwt =                         <ListGroup>
            {this.state.waitingPlans.map((plan, index)=>{
                return(
                <ListGroupItem key={index} onClick={(e)=>{
                    this.handleToggle(e);
                    this.setState({plan: plan});                             
                    this.loadPlandetail(plan.planId)}} >
                    { plan.planId }
                </ListGroupItem>
                );
            })}
        </ListGroup>;

        if(this.state.availablePlans.length===0)
            listgrpav = <ListGroup><ListGroupItem>Do not have any available plan yet...</ListGroupItem></ListGroup>
        else
            listgrpav =                         <ListGroup>
            {this.state.availablePlans.map((plan, index)=>{
                return(
                <ListGroupItem key={index} onClick={(e)=>{
                    this.handleToggle(e);
                    this.setState({plan: plan});
                    this.loadPlandetail(plan.planId);
                    this.ticketProgress(plan.planId);
                    }}>
                    { plan.planId }
                </ListGroupItem>
                );
            })}
        </ListGroup>;

        if(this.state.closedPlans.length===0)
            listgrpcl = <ListGroup><ListGroupItem>Do not have any closed plan yet...</ListGroupItem></ListGroup>
        else
            listgrpcl =                         <ListGroup>
            {this.state.closedPlans.map((plan, index)=>{
                return(
                <ListGroupItem key={index} onClick={(e)=>{
                    this.handleToggle(e);
                    this.setState({plan: plan});
                    this.loadPlandetail(plan.planId)}
                    }>
                    { plan.planId } 
                </ListGroupItem>);
            })}
        </ListGroup>;


        if(this.state.isLoading===true)
            return(
                <LoadingSpinner />
            )
        else {
        return (
        <div>
            <NavBar planCounting = {this.state.planCount}
                    closedPlanCounting = {this.state.closedPlanCount}
            /><br></br>
            <ActionButton /><br></br>
            <div>
            <Container>
                <Row>
                    <Col xs="6" sm="4"> Waiting plans
                        {listgrpwt}
                    </Col>
                    <Col xs="6" sm="4"> Available plans
                        {listgrpav}
                    </Col>
                    <Col sm="4"> Closed plans
                        {listgrpcl}
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
                    count={this.state.ticketCount}
            />
        </div>
        );
        }
    }
}
 
export default withRouter(PlanPage);