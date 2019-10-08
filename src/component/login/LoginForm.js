import { Form, FormGroup, Label, Button, FormFeedback } from 'reactstrap';
import React, { Component } from 'react';
import './LoginForm.css';
import '../../util/API.js'
import { login } from '../../util/API.js';
import {withRouter} from 'react-router-dom';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            usernamePasswordValid: true,
            selectedOption: 'admin',
            id:''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    handleSubmit(event){
        event.preventDefault();
        login(this.refs.userIdInput.value, this.refs.passInput.value)
            .then(res => {
                this.props.history.push('/home');   
            })
            .catch(err => {
                this.setState({formErrors: err.res});
            });
            
            sessionStorage.setItem("id", this.refs.userIdInput.value);
        }
        
    render() { 
        return ( 
        <Form onSubmit={this.handleSubmit} className="loginform" history={this.props.history} >
            <FormGroup>
                <Label for="exampleUsername">User ID:  </Label><br></br>
                <input type="text" name="userid" id="userid" 
                    placeholder="User id" ref="userIdInput" />
                <FormFeedback></FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for="examplePassword">Password:  </Label><br></br>
                <input type="password" name="password" id="password" 
                    placeholder="Password" ref="passInput" />
                <FormFeedback></FormFeedback>
            </FormGroup>
            <Button type = "submit" htmltype="submit" size="large" className="login-form-button">Login</Button>
        </Form>
        );
    }
}
 
export default withRouter(LoginForm);