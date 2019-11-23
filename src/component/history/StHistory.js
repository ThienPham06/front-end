import React, {Component } from 'react';
import {withRouter} from 'react-router-dom';
import NavBar from '../navbar/NavBar';
import ActionButton from '../action_button/ActionButton';
import { ListGroup, ListGroupItem, Container, Row, Col } from 'reactstrap';
import { Footer } from '../footer/Footer';
import {getPlansByStudent} from "../../util/API";

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

    componentDidMount(){
        this.loadPlansByStudent();
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
            <div className="main">
                <Container>
                    <Row>
                        <Col xs="4">Phiếu đang đợi xác nhận:
                            
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