import React, { Component } from 'react';
import './NotFound.css';
import NavBar from '../component/navbar/NavBar';
import {Button} from 'reactstrap';
import { Footer } from '../component/footer/Footer';

class NotFound extends Component {
    

    render() { 
        
        return (
        <div className='nf'>
            <NavBar planCounting = {sessionStorage.getItem("wtPlan")}
                    closedPlanCounting={sessionStorage.getItem("clPlan")}/><br></br>
            <div className="page-not-found">
                <h1 className="title">
                    401
                </h1>
                <div className="desc">
                    Bạn không có quyền truy cập hoặc quyền thực hiện hành động này!
                </div>
                {/* <Button className="go-back-btn" type="primary" size="large" onClick={this.goback}>Go Back</Button> */}
            </div>
            {/* <Footer /> */}
        </div>
           
        );
    }
}
 
export default NotFound;