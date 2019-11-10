import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import NavBar from '../navbar/NavBar';
import { ListGroup, ListGroupItem, Container, Row, Col, Button } from 'reactstrap';
import { getPlanByState, getPlandetailByPlanId, countWaitingTicket } from '../../util/API';
import './PlanPage.css'
import Plan from './Plan';
import LoadingSpinner from '../spinner/LoadingSpinner';
import ActionButton from '../action_button/ActionButton';
import _ from 'lodash';
import { Footer } from "../footer/Footer"

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
            button = <div className="buttonGroup"><Button size="lg" color="success" href="/planpage/create">Yêu cầu thêm lịch hiến máu</Button></div>;
        else
            button = <div className="buttonGroup"><Button size="lg" color="success" href="/notfound">Yêu cầu thêm lịch hiến máu</Button></div>;
        
        if(this.state.waitingPlans.length===0)
            listgrpwt = <ListGroup><ListGroupItem>Hiện tại chưa có lịch đang chờ xác nhận...</ListGroupItem></ListGroup>
        else
            listgrpwt =                         <ListGroup>
            {this.state.waitingPlans.map((plan, index)=>{
                return(
                <ListGroupItem key={index} onClick={(e)=>{
                    this.handleToggle(e);
                    this.setState({plan: plan});                             
                    this.loadPlandetail(plan.planId);
                //     let idx = _.findIndex(this.state.waitingPlans, function(p){
                //         return p.planId === plan.planId;
                //     });
                //     this.setState(state => {
                //      const list = state.waitingPlans.map((p, j) => {
                //         if (j === idx) {
                //             return p.className = "list-group-item1";
                //         } else {
                //              return p.className = ' ';
                //          }
                //     });
                //  return {
                //     list,
                //     };
                // });

                    }} >
                    { plan.planId }
                </ListGroupItem>
                );
            })}
        </ListGroup>;

        if(this.state.availablePlans.length===0)
            listgrpav = <ListGroup><ListGroupItem>Chưa có lịch có thể đăng ký...</ListGroupItem></ListGroup>
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
            listgrpcl = <ListGroup><ListGroupItem>Không có lịch đã đóng...</ListGroupItem></ListGroup>
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
        <div className="planpage">
            <NavBar planCounting = {this.state.planCount}
                    closedPlanCounting = {this.state.closedPlanCount}
            /><br></br>
            <ActionButton /><br></br>
            <div>
            <Container>
                <Row>
                    <Col xs="6" sm="4"> Lịch hiến máu chờ xác nhận:
                        {listgrpwt}
                    </Col>
                    <Col xs="6" sm="4"> Lịch hiến máu có thể đăng ký:
                        {listgrpav}
                    </Col>
                    <Col sm="4"> Lịch hiến máu đã đóng:
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
            <Footer />
        </div>
        );
        }
    }
}
 
export default withRouter(PlanPage);