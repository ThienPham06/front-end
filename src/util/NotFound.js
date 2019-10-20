import React, { Component } from 'react';
import './NotFound.css';
import NavBar from '../component/navbar/NavBar';
import {Button} from 'reactstrap';

class NotFound extends Component {
    
    render() { 
        return (
        <div>
            <NavBar /><br></br>
            <div className="page-not-found">
                <h1 className="title">
                    401
                </h1>
                <div className="desc">
                    Sorry! You don't have permission to access this page!
                </div>
                <Button className="go-back-btn" type="primary" size="large">Go Back</Button>
            </div>
        </div>
           
        );
    }
}
 
export default NotFound;