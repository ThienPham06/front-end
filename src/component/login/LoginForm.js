import { Form, FormGroup, Label, Button, FormFeedback, Input } from 'reactstrap';
import React, { Component } from 'react';
import './LoginForm.css';
import '../../util/API.js'
import { login } from '../../util/API.js';
import {withRouter} from 'react-router-dom';
import {ACCESS_TOKEN } from '../../constant/index.js';


class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            error:false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        login(this.idInput.value, this.passInput.value)
            .then(res => {
                if(res===200){
                    this.props.history.push('/home');
                    sessionStorage.setItem(ACCESS_TOKEN, res.accessToken); 
                }else if(res===401){
                    this.setState({error: !this.state.error})
                }
            })
            .catch(err => {
                console.log(err);  
            });
            sessionStorage.setItem("id", this.idInput.value);
            
        }
        
    render() { 
        let errInput;
        if(this.state.error===true){
            errInput=<div>
                <Label for="exampleUsername">User ID:  </Label>
                <Input  type="text" name="userid" id="userid" invalid
                        placeholder="User id" 
                        innerRef={x=>(this.idInput=x)} />
                <FormFeedback>User id or password is incorrect!</FormFeedback>
            </div>
        }else{
            errInput=<div>
                <Label for="exampleUsername">User ID:  </Label>
                <Input  type="text" name="userid" id="userid"
                    placeholder="User id" 
                    innerRef={x=>(this.idInput=x)} />
            </div> 
        }
        return ( 
        <Form onSubmit={(e)=>this.handleSubmit(e)} className="loginform" history={this.props.history} >
            <FormGroup>
                {errInput}
            </FormGroup>
            <FormGroup>
                <Label for="examplePassword">Password:  </Label>
                <Input type="password" name="password" id="password" 
                    placeholder="Password" innerRef={x=>(this.passInput=x)} />
            </FormGroup>
            <Button type = "submit" htmltype="submit" size="large" className="login-form-button">Login</Button>
        </Form>
        );
    }
}
 
export default withRouter(LoginForm);