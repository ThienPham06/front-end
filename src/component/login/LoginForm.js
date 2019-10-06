import { Form, FormGroup, Label, Button, FormFeedback } from 'reactstrap';
import React, { Component } from 'react';
import './LoginForm.css';
import '../../util/API.js'
import { login } from '../../util/API.js';
import {withRouter} from 'react-router-dom'

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            usernamePasswordValid: true,
            selectedOption: 'admin'
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handRadioChange = this.handRadioChange.bind(this);
    }

    handRadioChange(changeEvent){
        this.setState({selectedOption: changeEvent.target.value})
    }

    handleSubmit(event){
        event.preventDefault();
        login(this.refs.usernameInput.value, this.refs.passInput.value)
            .then(res => {
                // this.setState({formErrors: res});
                // console.log( this.state.formErrors);
                // console.log(this.state.selectedOption);
                this.props.history.push('/home');
            })
            .catch(err => {
                this.setState({formErrors: err.res});
                // console.log( this.state.formErrors);
            });
        }
        
    render() { 
        return ( 
        <Form onSubmit={this.handleSubmit} className="loginform" history={this.props.history} >
            <FormGroup>
                <Label for="exampleUsername">Username:  </Label><br></br>
                <input type="text" name="usename" id="usename" 
                    placeholder="username or user id" ref="usernameInput" />
                <FormFeedback></FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for="examplePassword">Password:  </Label><br></br>
                <input type="password" name="password" id="password" 
                    placeholder="password" ref="passInput" />
                <FormFeedback></FormFeedback>
            </FormGroup>
            {/* <FormGroup>
          <Label for="exampleCheckbox">Login as: </Label>
          <div>
            <CustomInput checked= {this.state.selectedOption==="admin"} type="radio" value="admin" id='1' name='admin' label="administrator"
                onChange={this.handRadioChange} />
            <CustomInput checked= {this.state.selectedOption==="student"} type="radio" value="student" id='2' name='student' label="student" 
                onChange={this.handRadioChange} />
          </div>
        </FormGroup> */}
            <Button type = "submit" htmltype="submit" size="large" className="login-form-button">Login</Button>
        </Form>
        );
    }
}
 
export default withRouter(LoginForm);