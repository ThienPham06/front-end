import { Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import React, { Component } from 'react';
import './LoginForm.css';
import { ACCESS_TOKEN } from '../../constant';
import '../../util/API.js'
import { login } from '../../util/API.js';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            loginRequest: {usernameOrId: '', password: '', "adminOrStudent": ''},
            usernamePasswordValid: true,
            formErrors: ''
        };
        // this.usernameRef = React.createRef();
        // this.passRef = React.createRef();
        
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.showValue = this.showValue.bind(this);
    }

    showValue = () => {
        try{alert(this.refs.usernameInput.value + '   ' + this.refs.passInput.value)}
        catch(err) {
            console.log(err); 
        }
    }

    handleSubmit(event){
        event.preventDefault();
        // this.setState.loginRequest = {
        //     usernameOrId: this.refs.usernameInput.value,
        //     password: this.refs.passInput.value,
        //     adminOrStudent: 'student'};
        login(this.refs.usernameInput.value, this.refs.passInput.value, 'student')
            .then(res => {
                localStorage.setItem(ACCESS_TOKEN, res.access_token);
                return res;  
            })
            .catch(err => {
                console.log(err.res);
            })
        }
        
    render() { 
        return ( 
        <Form onSubmit={this.handleSubmit} className="loginform">
            <FormGroup>
                <Label for="exampleUsername">Username:  </Label>
                <input type="text" name="usename" id="usename" 
                    placeholder="username or user id" ref="usernameInput" />
                <FormFeedback>{ this.props.formErrors }</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for="examplePassword">Password:  </Label>
                <input type="password" name="password" id="password" 
                    placeholder="password" ref="passInput" />
                <FormFeedback>{ this.props.formErrors }</FormFeedback>
            </FormGroup>
            <Button type = "submit" htmltype="submit" size="large" className="login-form-button">Login</Button>
        </Form>
        );
    }
}
 
export default LoginForm;