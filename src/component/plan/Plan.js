import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table, Progress, Input, InputGroup } from 'reactstrap';
import {withRouter} from 'react-router-dom';
import {approveRequest, rejectRequest, createTicket} from '../../util/API';
import swal from '@sweetalert/with-react';

class Plan extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isLoading:false,
            modal: this.props.modalFromList,
            ticketRequest: {
                planId:'', studentId:''
            },
            ticketCount:'',
            nestedModal:false,
            reason:''
        };
    }

    toggle = () => {
        this.props.modalCallbackFromList(!this.state.modal)
    }
    
    toggleNested = () => {
        this.setState({nestedModal:!this.state.nestedModal})
    }

    validateRegis = (count, quantity) => {
        var a = parseInt(count);
        if(a>=quantity)
            return true;
    }

    handleApprove = (event) => {
        event.preventDefault();
        if(sessionStorage.getItem("role")==='ADMIN'){
            approveRequest(this.props.plan.planId, sessionStorage.getItem("id")).then(res=>{
                if(res===true){
                    swal({
                        title: "Xác nhận thành công!",
                        text: "Yêu cầu thêm lịch hiến máu đã được xác nhận!",
                        icon: "success",
                        button: "OK",
                      }).then(()=>{
                        this.toggle();
                        window.location.reload();
                      })
                }else{
                    swal({
                        title: "Xác nhận KHÔNG thành công!!",
                        text: "Đã xảy ra lỗi, vui lòng thử lại!",
                        icon: "error",
                        button: "OK",
                      });
                }
            })
        }else{
            this.props.history.push("/notfound");
        }
    }

    handleReject = (event) => {
        event.preventDefault();
            rejectRequest(this.props.plan.planId, this.inputReason.value, sessionStorage.getItem("id")).then(res=>{
                if(res===true){
                    swal({
                        title: "Đã hủy!",
                        text: "Yêu cầu thêm lịch hiến máu đã bị hủy bỏ!",
                        icon: "success",
                        button: "OK",
                      }).then(()=>{
                        this.toggle();
                        window.location.reload();
                      })
                }else{
                    swal({
                        title: "Hủy thất bại!",
                        text: "Đã xảy ra lỗi, vui lòng thử lại!",
                        icon: "error",
                        button: "OK",
                      });
                }
            })
      
    }

    handleNestedReason = (event) => {
        event.preventDefault();
        if(sessionStorage.getItem("role")==='ADMIN'){
            this.toggleNested();
        }
        else{
            this.props.history.push("/notfound");
        }   
    }

    handleRegister = (event) => {
        event.preventDefault();
        const {ticketRequest} = this.state;
        ticketRequest.planId = this.props.plan.planId;
        ticketRequest.studentId = sessionStorage.getItem("id");
 
        if(sessionStorage.getItem("role")==='ADMIN'){
            this.props.history.push("/notfound");
        }else{
            if(this.validateRegis(this.props.count, this.props.plan.quantity)){
                swal({
                    title: "Cảnh báo!",
                    text: "Đã đủ số lượng sinh viên đăng ký! Tải lại trang nếu cần!",
                    icon: "warning",
                    button: "OK",
                  })
            }else{
            createTicket(ticketRequest).then(res=>{ 
                if(res==="sc"){
                    swal({
                        title: "Thành công!",
                        text: "Bạn đã đăng ký tham gia hiến máu thành công! :)",
                        icon: "success",
                        button: "OK",
                      }).then(()=>{
                        this.toggle();
                        window.location.reload();
                      })
                }else if(res==="ex"){
                    swal({
                        title: "Lỗi!",
                        text: "Bạn đã đăng ký tham gia lịch hiến máu này! Vui lòng kiểm tra lại!",
                        icon: "error",
                        button: "OK",
                      }).then(()=>{
                        this.toggle();
                      })
                }else {
                    swal({
                        title: "Lỗi!",
                        text: "Bạn không thể đăng ký tham gia hiến máu 2 lần cùng lúc!",
                        icon: "error",
                        button: "OK",
                      }).then(()=>{
                        this.toggle();
                      })
                } 
            })
        }
        } 
    }

    handleCheck = (event) => {
        event.preventDefault();
        if(sessionStorage.getItem("role")==='ADMIN')
            this.props.history.push("/ticketpage");
        else if(sessionStorage.getItem("role")==='STUDENT')
            this.props.history.push("/notfound");
    }


    render() { 
            
        let button;
        if(this.props.plan.planState==='available'){
            button=<Button color="success" onClick={(e)=>this.handleRegister(e)}>Đăng ký</Button>
        }else if(this.props.plan.planState==='closed'){
            button=<Button color="danger" onClick={(e)=>this.handleCheck(e)}>Đến trang xác nhận đơn</Button>
        }else{
            button=<div>
                <Button color="success" onClick={(e)=>this.handleApprove(e)}>Xác nhận</Button>{" "}
                <Button color="danger" onClick={this.toggleNested}>Hủy bỏ</Button>
            </div>
        }
        return ( 
            <Modal isOpen={this.props.modalFromList} toggle={this.toggle} fade={true} scrollable={true}>
                <ModalHeader>Thông tin chi tiết lịch hiến máu</ModalHeader>
                <ModalBody>
                    <Table>
                    <tr>
                        <th>Mã số: </th>
                        <th> {this.props.plan.planId}</th>
                    </tr>
                    <tr>
                        <th>Ngày tổ chức: </th>
                        <th> {this.props.plandetail.plandDate} </th>
                    </tr>
                    <tr>
                        <th>Nơi diễn ra:</th>
                        <th>{this.props.plandetail.plandPlace}</th>
                    </tr>
                    <tr>
                        <th>Trạng thái lịch: </th>
                        <th>{this.props.plan.planState}</th>
                    </tr>
                    <tr>
                        <th>Số lượng dự kiến: </th>
                        <th>{this.props.plan.quantity}</th>
                    </tr>
                    <tr>
                        <th>Liên hệ: </th>
                        <th>{this.props.plandetail.plandContact}</th>
                    </tr>
                    <tr>
                        <th>Tiến trình đăng ký: </th>
                        <th>
                            <p className="counter">{this.props.count}/{this.props.plan.quantity}</p>
                        </th>
                    </tr>
                    <tr>
                        <th></th>
                        <th>
                            <Progress bar color="success" value={this.props.count} 
                                    max={this.props.plan.quantity}>{this.props.count}/{this.props.plan.quantity}</Progress>
                        </th>
                    </tr>
                    </Table>
                </ModalBody>
                <ModalFooter>
                    {button}{" "}
                    <Button onClick={this.toggle}>Đóng</Button>
                </ModalFooter>
            <Modal fade={true} isOpen={this.state.nestedModal} toggle={this.toggleNested}>
                <ModalHeader>Nhập lí do hủy:</ModalHeader>
                <ModalBody>
                    <Input required type="text" className="reason" 
                            id="reason" 
                            placeholder="Reason" 
                            innerRef={x=>(this.inputReason=x)} />
                </ModalBody>
                <ModalFooter>
                    <Button color ="success" onClick={(e)=>{this.handleReject(e)}}>Tiếp tục</Button>
                    <Button onClick={this.toggleNested}>Đóng</Button>
                </ModalFooter>
            </Modal>
            </Modal>
        );
    }
}
 
export default withRouter(Plan);