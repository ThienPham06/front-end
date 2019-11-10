import React, {Component} from 'react';
import {Modal, ModalBody, ModalHeader, ModalFooter, Button, Table, Input} from 'reactstrap';
import {approveTicket, rejectTicket, getWaitingTickets} from '../../util/API';
import swal from '@sweetalert/with-react';

class Ticket extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            modal: this.props.modalFromList,
            flag: this.props.flagFromList,
            ntickets:[],
            nestedModal:false
        }
    }

    toggle = () => {
        this.props.modalCallbackFromList(!this.state.modal);    
    }

    toggleNested = () => {
        this.setState({nestedModal:!this.state.nestedModal})
    }

    loadWaitingTicketsByPlan = (planid) => {
        getWaitingTickets(planid).then(res=>{
            this.setState({ntickets:res});
        })
    }

    handleApprove = (e) => {
        e.preventDefault();
        approveTicket(this.props.ticket.ticketId, sessionStorage.getItem("id")).then(res=>{
            if(res===true){
                swal({
                    title: "Thành công!",
                    text: "Phiếu đăng kí tham gia đã được xác nhận!",
                    icon: "success",
                    button:"OK"
                  }).then(()=>{
                    this.toggle();
                  });
            }else{
                swal({
                    title: "Lỗi!",
                    text: "Đã có lỗi xảy ra! Vui lòng thử lại!",
                    icon: "error",
                    button:"OK"
                  })
            }
        });
    }

    handleReject = (e) => {
        e.preventDefault();
        rejectTicket(this.props.ticket.ticketId, sessionStorage.getItem("id"), this.inputReason.value).then(res=>{
            if(res===true){
                swal({
                    title: "Thành công!",
                    text: "Phiếu đăng kí tham gia đã bị hủy bỏ!",
                    icon: "success",
                    button:"OK"
                  }).then(()=>{
                    this.toggle();
                  });
            }else{
                swal({
                    title: "Lỗi!",
                    text: "Đã có lỗi xảy ra! Vui lòng thử lại!",
                    icon: "error",
                    button:"OK"
                  })
            }
        });
    }

    render() { 
        return ( 
        <Modal isOpen={this.props.modalFromList} toggle={this.toggle}>
            <ModalHeader>Thông tin chi tiết phiếu đăng kí</ModalHeader>
            <ModalBody>
                <Table>
                    <tr>
                        <th>Mã số phiếu: </th>
                        <th>{this.props.ticket.ticketId}</th>
                    </tr>
                    <tr>
                        <th>Mã số sinh viên đăng kí: </th>
                        <th>{this.props.student.studentId}</th>
                    </tr>
                    <tr>
                        <th>Ngày đăng kí: </th>
                        <th>{this.props.ticket.ticketCreatedTime}</th>
                    </tr>
                </Table>
            </ModalBody>
            <ModalFooter>
                <Button color="success" onClick={(e)=>{this.handleApprove(e)}}>Xác nhận</Button>
                <Button color="danger" onClick={this.toggleNested}>Hủy bỏ</Button>
                <Button onClick={this.toggle}>Đóng</Button>
            </ModalFooter>
            <Modal fade={true} isOpen={this.state.nestedModal} toggle={this.toggleNested}>
                <ModalHeader>Nhập lí do hủy:</ModalHeader>
                <ModalBody>
                    <Input required type="text" className="reason" 
                            id="reason" 
                            placeholder="Lí do" 
                            innerRef={x=>(this.inputReason=x)} />
                </ModalBody>
                <ModalFooter>
                    <Button color ="success" onClick={(e)=>{this.handleReject(e)}}>Tiếp tục</Button>
                    <Button onClick={this.toggleNested}>Trở lại</Button>
                </ModalFooter>
            </Modal>
        </Modal>
        );
    }
}
 
export default Ticket;