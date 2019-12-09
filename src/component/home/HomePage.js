import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import SlideShow from '../sildeshow/SlideShow';
import './HomePage.css';
import NavBar from '../navbar/NavBar';
import LoadingSpinner from '../spinner/LoadingSpinner';
import { Footer } from '../footer/Footer';
import ActionButton from '../action_button/ActionButton';
import { getPlanByState } from '../../util/API';
import { Container, Row, Col, Toast, ToastHeader, ToastBody, Collapse, Button, ButtonGroup, CardBody, Card } from 'reactstrap';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            currentRole:'',
            isOpen1:false,
            isOpen2:false,
            isOpen3:false
        }
    }

    toggle1 = () =>{
        this.setState({isOpen1:!this.state.isOpen1})
        this.setState({isOpen2:false})
        this.setState({isOpen3:false})
    }
    toggle2 = () =>{
        this.setState({isOpen2:!this.state.isOpen2})
        this.setState({isOpen1:false})
        this.setState({isOpen3:false})
    }
    toggle3 = () =>{
        this.setState({isOpen3:!this.state.isOpen3})
        this.setState({isOpen1:false})
        this.setState({isOpen2:false})
    }

    // setRole = () => {
    //     const id = sessionStorage.getItem("id");
    //     getAdminById(id).then(res=>{
    //         if(res==='ADN-NaN'){
    //             this.setState({currentRole: "STUDENT"});
    //         }
    //         else {
    //             this.setState({currentRole: "ADMIN"})
    //         }
    //         sessionStorage.setItem("role", this.state.currentRole);
    //         console.log(sessionStorage.getItem("role"));
    //     })   
    // }


    loadClosedPlans=()=>{
        getPlanByState("closed").then(response => {
            sessionStorage.setItem("clPlan", response.length);
        })
    };

    loadWaitingPlans=()=>{
        getPlanByState("waiting").then(response => {
            sessionStorage.setItem("wtPlan", response.length);

        })
    };

    componentDidMount(){
        // this.setRole();
        this.setState({isLoading:false});
        this.loadClosedPlans();
        this.loadWaitingPlans();
    }

    render() { 
        if(this.state.isLoading)
            return(
                <LoadingSpinner />
            )
        else {
        return ( 
        <div className="homepage">
            <NavBar planCounting={sessionStorage.getItem("wtPlan")}
                    closedPlanCounting = {sessionStorage.getItem("clPlan")}
            /><br></br>
            <ActionButton /><br />
            <div>
                    <Row>
                        <Col xs="4">
                        <br />
                            <Toast className="toast">
                                <ToastHeader>Hướng dẫn sử dụng hệ thống</ToastHeader>
                                <ToastBody>
                                    <ButtonGroup>
                                        <Button onClick={this.toggle1} style={{ marginBottom: '1rem' }}>Bước 1</Button>------><Button onClick={this.toggle2} style={{ marginBottom: '1rem' }}>Bước 2</Button>-------><Button onClick={this.toggle3} style={{ marginBottom: '1rem' }}>Bước 3</Button>
                                    </ButtonGroup>
                                    <div><Collapse isOpen={this.state.isOpen1}>
                                            <Card className="card">
                                                <CardBody>
                                                    Sinh viên đăng ký tham gia các lịch hiến máu hiện có 
                                                    tại trang Lịch hiến máu.
                                                </CardBody>
                                            </Card>
                                        </Collapse></div>
                                        <div><Collapse isOpen={this.state.isOpen2}>
                                            <Card className="card">
                                                <CardBody>
                                                    Nếu đăng kí thành công, phiếu đăng ký sẽ được tạo để đợi xác nhận.
                                                </CardBody>
                                            </Card>
                                        </Collapse></div>
                                        <div><Collapse isOpen={this.state.isOpen3}>
                                            <Card className="card">
                                                <CardBody>
                                                    Sau khi tham gia đợt hiến máu đã đăng ký, phiếu đăng ký sẽ được xác nhận và ngược lại.
                                                </CardBody>
                                            </Card>
                                        </Collapse></div>                                        
                                </ToastBody>
                            </Toast>
                        </Col>
                        <Col xs="4">
                            <SlideShow className = "slide" />
                        </Col>
                    </Row>
                </div>
            {/* <Footer /> */}
        </div>
        );
        }
    }
}
 
export default withRouter(HomePage);