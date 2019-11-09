import { Form, FormGroup, Card, CardBody, CardImg, Button, FormFeedback, Input } from 'reactstrap';
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
                {/* <Label for="exampleUsername">User ID:  </Label> */}
                <Input  type="text" name="userid" id="userid" invalid
                        placeholder="Mã số người dùng" 
                        innerRef={x=>(this.idInput=x)} />
                <FormFeedback>User id or password is incorrect!</FormFeedback>
            </div>
        }else{
            errInput=<div>
                {/* <Label for="exampleUsername">User ID:  </Label> */}
                <Input  type="text" name="userid" id="userid"
                    placeholder="Mã số người dùng" 
                    innerRef={x=>(this.idInput=x)} />
            </div> 
        }
        return ( 
        <div className="page">
        <Card className="card">
            <CardImg top width="90%" src="/images/user.png" alt="Card image cap" />
            <CardBody>
                <Form onSubmit={(e)=>this.handleSubmit(e)} className="loginform" history={this.props.history} >
                <FormGroup>
                    {errInput}
                </FormGroup>
                <FormGroup className="fgr">
                    {/* <Label for="examplePassword">Password:  </Label> */}
                    <Input type="password" name="password" id="password" 
                        placeholder="Mật khẩu" innerRef={x=>(this.passInput=x)} />
                </FormGroup>
                <Button color="info" type = "submit" htmltype="submit" size="large" className="login-form-button">Đăng nhập</Button>
                </Form>
            </CardBody>
        </Card>
        </div>
        );
    }
}
 
export default withRouter(LoginForm);