import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { Container, Row, Col, Card, CardImg, CardBody, CardTitle, Button, Table} from 'reactstrap';
import {getStudentById, getAdminById, getStudentDetailById, getAdminDetailById} from '../../util/API';
import NavBar from '../navbar/NavBar';
import { Footer } from '../footer/Footer';
import './Profiles.css';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            student:[],
            studentDetail:[],
            admin:[],
            adminDetail:[],
            inputid:''
         }
    }

    loadStudent=(id)=>{
        getStudentById(id).then(response=>{
            this.setState({student: response})   
        })
    }

    loadStudentDetail = (id) => {
        if(this.state.admin!=="STD-NaN"){
            getStudentDetailById(id).then(response=>{
                this.setState({studentDetail: response})
            })
        }
    }

    loadAdmin=(id)=>{
        getAdminById(id).then(response=>{
            this.setState({admin: response})
        })
    }

    loadAdminDetail = (id) =>{
        if(this.state.admin!=="ADN-NaN"){
            getAdminDetailById(id).then(response=>{
                this.setState({adminDetail: response})
            })
        }       
    }

    componentDidMount(){
        this.loadAdmin(sessionStorage.getItem("id"));
        this.loadStudent(sessionStorage.getItem("id")); 
        this.loadStudentDetail(sessionStorage.getItem("id"));
        this.loadAdminDetail(sessionStorage.getItem("id"));
    }

    render() {

        let table;
        let image;
        if(this.state.admin!=="ADN-NaN"){
            image=<CardImg top width="100%" height="100%" src={this.state.adminDetail.admindetailPortrait} alt="Card image cap"/>
            table=
            <div className="tableinfo">
            <Table>
            <tr>
                <td>Mã số cán bộ: </td>
                <td>{this.state.admin.adminId}</td>
            </tr>
            <tr>
                <td>Họ tên: </td>
                <td>{this.state.adminDetail.admindetailFullname}</td>
            </tr>
            <tr>
                <td>Email: </td>
                <td>{this.state.adminDetail.admindetailEmail}</td>
            </tr>

        </Table></div>
        }else{
            image=<CardImg top width="100%" height="100%" src={this.state.studentDetail.studentdetailPortrait} alt="Card image cap"/>
            table=
            <div className="tableinfo">
            <Table>
            <tr>
                <td>Mã số sinh viên: </td>
                <td>{this.state.student.studentId}</td>
            </tr>
            <tr>
                <td>Họ tên: </td>
                <td>{this.state.studentDetail.studentdetailFullname}</td>
            </tr>
            <tr>
                <td>Email: </td>
                <td>{this.state.studentDetail.studentdetailEmail}</td>
            </tr>
            <tr>
                <td>Nhóm máu: </td>
                <td>{this.state.studentDetail.studentdetailBloodgroup}</td>
            </tr>

        </Table></div>
        
        }
        return ( 
            <div>
            <NavBar planCounting={sessionStorage.getItem("wtPlan")}
                    closedPlanCounting={sessionStorage.getItem("clPlan")}
            /><br></br><br></br><br></br>
            <Container>
                <Row>
                    <Col xs="6">
                        <Card className="usercard">
                            {image}
                            <CardBody>
                                <CardTitle>Ảnh đại diện</CardTitle>                    
                                {/* <Button>Đổi ảnh đại diện</Button> */}
                            </CardBody>
                        </Card>
                    </Col><br></br>
                    <Col xs="6">
                        {table}
                    </Col>
                </Row>
            </Container>
            {/* <Footer /> */}
            </div>
        );
    }
}
 
export default withRouter(Profile);