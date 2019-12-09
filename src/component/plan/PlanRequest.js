import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {withRouter} from 'react-router-dom';
import NavBar from '../navbar/NavBar';
import './PlanRequest.css';
import { createRequest } from '../../util/API';
import swal from '@sweetalert/with-react';
import { Footer } from '../footer/Footer';

class PlanRequest extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            planRequest:{
                planId:'', date:'', venue:'', contact:'', creatorId:'', quantity:''
            },
            errors:{
                planid:'',
                date:'',
                quantityV:'',
                place:'',
                contact:''

            }
        }
    }

    getValidStringDate = (days) => {
        var result = new Date();
        result.setDate(result.getDate() + days);
        var day = result.getDate();
        var month = result.getMonth() + 1;
        var year = result.getFullYear();
        return year + '-' + month + '-' + day;
    }

    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        var valid = this.getValidStringDate(9);
        var input = this.dateInput.value;
        let errors = this.state.errors;
        switch(name){
            case 'planId':
                errors.planid = value.length > 5 ? 'Mã số lịch phải ít hơn 5 kí tự!' : '';
                break;
            case 'planDate':
                errors.date = Date.parse(input) <= Date.parse(valid) ? 'Ngày tổ chức phải nhiều hơn 9 ngày kể từ ngày hôm nay!' : ''; 
                break;
            case 'quantity':
                errors.quantityV = value > 200 ? "Số lượng dự kiến tối đa là 200" : ''
                errors.quantityV = value < 10 ? "Số lượng tối thiểu là 10" : ''
                break;
            case 'planPlace':
                errors.place = value.length < 1 ? "Nơi tổ chức không được để trống" : ''
                break
            case 'planContact': 
                errors.contact = value.length < 1 ? "Liên hệ không được để trống" : ''
                break;

        }
        this.setState({errors, [name]: value});

    }

    handleSubmit = (event) => {
        event.preventDefault();

        const {planRequest} = this.state;
        planRequest.planId=this.idInput.value;
        planRequest.date=this.dateInput.value;
        planRequest.contact=this.contactInput.value;
        planRequest.venue=this.venueInput.value;
        planRequest.quantity=this.quantityInput.value;
        planRequest.creatorId=sessionStorage.getItem("id");

        createRequest(planRequest).then(res=>{
            if(res===true){
                this.props.history.push('/planpage');
                swal({
                    title: "Thành công!",
                    text: "Yêu cầu mới đã được thêm thành công!",
                    icon: "success",
                    button: "OK",
                  }).then(()=>{
                    window.location.reload();
                  });
            } else {
                swal({
                    title: "Lỗi!",
                    text: "Mã số lịch đã tồn tại!",
                    icon: "error",
                    button: "Thử lại",
                  })
            }
        }).catch(err=>{
            console.log(err);      
        })

    }

    render() { 
        const {errors} = this.state;
        let subBut;
        if(errors.date.length>0 || errors.planid.length>0 || errors.quantityV.length>0 || errors.place.length>0 || errors.contact.length>0){
            subBut = <Button disabled>Tạo</Button>
        }else{
            subBut = <Button color='success' onClick={(e)=>this.handleSubmit(e)}>Tạo</Button>
        }
        return ( 
        <div className="planrequest">
            <NavBar planCounting={sessionStorage.getItem("wtPlan")}
                    closedPlanCounting={sessionStorage.getItem("clPlan")}
            /><br></br>
            <div  className='title'><Label>Tạo yêu cầu thêm lịch hiến máu:</Label></div>
            <Form className="form">
                <FormGroup row>
                    <Label for="planId" sm={4}>Mã số : </Label>
                    <Col sm={10}>
                        <Input
                            type="text" 
                            name="planId" 
                            id="planId" 
                            placeholder="Mẫu: 'PL01'"
                            innerRef={x=>(this.idInput=x)}
                            onChange={(e)=>this.handleChange(e)}  required/>
                        {errors.planid.length>0 && <div className='err'><span>{errors.planid}</span></div>}
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="planDate" sm={4}>Ngày tổ chức: </Label>
                    <Col sm={10}>
                        <Input required type="date" name="planDate" id="planDate" 
                            placeholder="Ngày tổ chức"
                            innerRef={x=>(this.dateInput=x)} 
                            onChange={(e)=>this.handleChange(e)}
                            />
                         {errors.date.length>0 && <div className='err'><span>{errors.date}</span></div>}
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="planPlace" sm={4}>Địa điểm: </Label>
                    <Col sm={10}>
                        <Input required type="textarea" 
                            name="planPlace" 
                            id="planPlace" 
                            placeholder="Địa điểm tổ chức"
                            innerRef={x=>(this.venueInput=x)} 
                            onChange={(e)=>this.handleChange(e)}
                            />
                            {errors.place.length>0 && <div className='err'><span>{errors.place}</span></div>}
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="planContact" sm={4}>Liên hệ: </Label>
                    <Col sm={10}>
                        <Input required type="text" name="planContact" 
                            id="planContact" 
                            placeholder="Họ tên, số điện thoại" 
                            innerRef={x=>(this.contactInput=x)}
                            onChange={(e)=>this.handleChange(e)}
                            />
                            {errors.contact.length>0 && <div className='err'><span>{errors.contact}</span></div>}
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="quantity" sm={4}>Số lượng dự kiến: </Label>
                    <Col sm={10}>
                        <Input required type='number' name="quantity" 
                            id="quantity" 
                            placeholder="Số lượng" 
                            innerRef={x=>(this.quantityInput=x)}
                            onChange={(e)=>this.handleChange(e)}
                            />
                            {errors.quantityV.length>0 && <div className='err'><span>{errors.quantityV}</span></div>}
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="creatorID" sm={4}>Mã số người tạo: </Label>
                    <Col sm={10}>
                        <Input required disabled type="text" id="creatorID" 
                            value={sessionStorage.getItem("id")}/>      
                    </Col>
                </FormGroup>
                <FormGroup className='buttonGr'>
                    {subBut} {' '}
                    <Button href='/planpage' >Hủy</Button>
                </FormGroup>
            </Form>
            <Footer />
            </div>
        );
    }
}
 
export default withRouter(PlanRequest);