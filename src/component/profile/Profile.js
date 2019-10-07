import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { Container, Row, Col, Card, CardImg, CardBody, CardTitle, Button, Table} from 'reactstrap';
import {getStudentById, getAdminById} from '../../util/API';
import cookie from 'react-cookies';
// import cookie from 'react-cookies'

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            student:[],
            admin:[]
         }
    }

    // loadStudent=(id)=>{
    //     getStudentById(id).then(response=>{
    //         this.setState({student: response})
    //     })
    // }

    // loadAdmin=(id)=>{
    //     getAdminById(id).then(response=>{
    //         this.setState({admin: response})
    //     })
    // }

    // componentDidMount(){
    //     this.loadStudent(this.props.userID);
    //     this.loadAdmin(this.props.userID);
    // }

    render() { 
        let table;
        if(this.state.student===null){
            table=<Table>
            <tr>
                <td>Admin ID: </td>
                <td></td>
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
                <td></td>
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
                <td>Bloodgroup: </td>
                <td></td>
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
                                <CardTitle>aa   {localStorage.getItem("id")}</CardTitle>
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