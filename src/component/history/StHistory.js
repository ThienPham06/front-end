import React, {Component } from 'react';
import {withRouter} from 'react-router-dom';
import NavBar from '../navbar/NavBar';
import ActionButton from '../action_button/ActionButton';
import { ListGroup, ListGroupItem, Container, Row, Col, Modal, ModalBody, ModalHeader, ModalFooter, Button} from 'reactstrap';
import { Footer } from '../footer/Footer';
import {getPlansByStudent, getWaitingTicketsByStudent, getCheckedTicketsByStudent} from "../../util/API";
import './HistoryPage.css';
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';

class StHistory extends Component {
    pdfExportComponent;
    constructor(props) {
        super(props);
        this.state = {
            waitingTickets:[],
            plans:[],
            checkedTickets:[],
            selectedTicket:[],
            modal:false
        }
    }

    exportPDFWithComponent = () => {
        this.pdfExportComponent.save();
    }

    toggle = () =>{
        this.setState({modal:!this.state.modal})
    }

    loadPlansByStudent = () => {
        getPlansByStudent(sessionStorage.getItem('id')).then(res=>{
            this.setState({plans:res});
        })
    }

    loadWaitingTicketByStudent = () => {
        getWaitingTicketsByStudent(sessionStorage.getItem('id')).then(res=>{
            this.setState({waitingTickets:res});
        })
    }

    loadCheckedTicketByStudent = () =>{
        getCheckedTicketsByStudent(sessionStorage.getItem('id')).then(res=>{
            this.setState({checkedTickets:res});
        })
    }
    
    componentDidMount(){
        this.loadPlansByStudent();
        this.loadWaitingTicketByStudent();
        this.loadCheckedTicketByStudent();
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
            
        let listchecked;
        if(this.state.checkedTickets.length===0)
            listchecked = <ListGroup><ListGroupItem>Không có phiếu nào được xác nhận!</ListGroupItem></ListGroup>
        else
            listchecked =
            <ListGroup> {this.state.checkedTickets.map((ticket, index)=>{
                return(
                    <ListGroupItem key={index} onClick={()=>{
                        this.setState({selectedTicket:ticket});
                        this.toggle()
                    }}>
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
                        <Col xs="4">Các phiếu đăng ký đã được xác nhận:
                            {listchecked}
                        </Col>
                    </Row>
                </Container>
            </div> 
            <div className="grid">  
            <Modal isOpen={this.state.modal} onClick={this.toggle}>
            <PDFExport ref={(component) => this.pdfExportComponent = component} paperSize="A4">
                <ModalHeader>PHIEU XAC NHAN THAM GIA HIEN MAU - DAI HOC CAN THO</ModalHeader>
                <ModalBody>
                    <ListGroup>
                        <ListGroupItem>
                            {'MA SO PHIEU:  ' +  this.state.selectedTicket.ticketId}
                        </ListGroupItem>
                        <ListGroupItem>  
                            {'MA SO SINH VIEN:  ' +  sessionStorage.getItem('id')}
                        </ListGroupItem>
                        <ListGroupItem>
                            {'NGAY DANG KY:  ' +  this.state.selectedTicket.ticketCreatedTime}
                        </ListGroupItem>
                        <ListGroupItem>TRANG THAI PHIEU:  Da xac nhan
                        </ListGroupItem>
                    </ListGroup>
                </ModalBody>
            </PDFExport>
                <ModalFooter>
                    <Button color="success" onClick={this.exportPDFWithComponent}>Xuất phiếu</Button>
                    <Button onClick={this.toggle}>Trở về</Button>
                </ModalFooter>
            </Modal>
            </div>
            {/* <Footer />          */}
        </div>
        );
    }
}
 
export default withRouter(StHistory);