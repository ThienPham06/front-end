import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { Container, Row, Col, Card, CardImg, CardBody, CardTitle, Button, Table} from 'reactstrap';
import {getStudentById, getAdminById, getStudentDetailById} from '../../util/API';
import NavBar from '../navbar/NavBar';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            student:[],
            studentDetail:[],
            admin:[],
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

    componentDidMount(){
        this.loadAdmin(sessionStorage.getItem("id"));
        this.loadStudent(sessionStorage.getItem("id")); 
        this.loadStudentDetail(sessionStorage.getItem("id"));
    }

    render() {

        let table;
        let image;
        if(this.state.admin!=="ADN-NaN"){
            table=<Table>
            <tr>
                <td>Admin ID: </td>
                <td>{this.state.admin.adminId}</td>
            </tr>
            <tr>
                <td>Fullname: </td>
                <td></td>
            </tr>
            <tr>
                <td>Email: </td>
                <td></td>
            </tr>
            <tr>
                <td>Department: </td>
                <td></td>
            </tr>
        </Table>
        }else{
            image=<CardImg top width="100%" height="100%" src={this.state.studentDetail.studentdetailPortrait} alt="Card image cap"/>
            table=<Table>
            <tr>
                <td>Student ID: </td>
                <td>{this.state.student.studentId}</td>
            </tr>
            <tr>
                <td>Fullname: </td>
                <td>{this.state.studentDetail.studentdetailFullname}</td>
            </tr>
            <tr>
                <td>Email: </td>
                <td>{this.state.studentDetail.studentdetailEmail}</td>
            </tr>
            <tr>
                <td>Bloodgroup: </td>
                <td>{this.state.studentDetail.studentdetailBloodgroup}</td>
            </tr>
            <tr>
                <td>Department: </td>
                <td></td>
            </tr>
        </Table>
        }
        return ( 
            <div>
            <NavBar planCounting={sessionStorage.getItem("wtPlan")}
                    closedPlanCounting={sessionStorage.getItem("clPlan")}
            />
            <Container>
                <Row>
                    <Col xs="6">
                        <Card>
                            {image}
                            <CardBody>
                                <CardTitle></CardTitle>                    
                                <Button>Change image</Button>
                            </CardBody>
                        </Card>
                    </Col><br></br>
                    <Col xs="6">
                        {table}
                    </Col>
                </Row>
            </Container>
            </div>
        );
    }
}
 
export default withRouter(Profile);