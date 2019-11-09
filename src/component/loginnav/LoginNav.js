import React, { Component } from 'react';
import {Navbar,NavbarBrand} from 'reactstrap';

class LoginNav extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                <Navbar color="light" light >
                    <NavbarBrand className="mr-auto"  href='/home'>
                        <img src='/images/logo.png' /> HỆ THỐNG QUẢN LÍ HIẾN MÁU 
                    </NavbarBrand>
                </Navbar>
            </div>
         );
    }
}
 
export default LoginNav;