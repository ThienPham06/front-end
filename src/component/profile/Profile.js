import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { Container, Row, Col, Card, CardImg, CardBody, CardTitle, Button, Table} from 'reactstrap';
import {getStudentById, getAdminById, getStudentDetailById} from '../../util/API';

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
        getStudentDetailById(id).then(response=>{
            this.setState({studentDetail: response})
        })
    }

    loadAdmin=(id)=>{
        getAdminById(id).then(response=>{
            this.setState({admin: response})
        })
    }

    componentDidMount(){
        this.loadStudent(sessionStorage.getItem("id"));
        this.loadAdmin(sessionStorage.getItem("id"));
        this.loadStudentDetail(sessionStorage.getItem("id"));
    }

    render() { 
        let table;
        if(this.state.student==="STD-NaN"){
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
            <Container>
                <Row>
                    <Col xs="6">
                        <Card>
                            <CardImg top width="100%" src="" alt="Card image cap"/>
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
        );
    }
}
 
export default withRouter(Profile);