import React, { Component } from 'react';
import '../navbar/NavBar.css'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import {ACCESS_TOKEN } from '../../constant/index.js';
import {withRouter} from 'react-router-dom';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
        this.toggleNavbar = this.toggleNavbar.bind(this);
    }

    toggleNavbar() {
        this.setState({
          collapsed: !this.state.collapsed
        });
    };

    onLogout = () => {
        sessionStorage.removeItem(ACCESS_TOKEN);
        sessionStorage.removeItem("id");
        this.props.history.push('/');
    }

    render() { 
        return ( 
            <Navbar color="faded" light className="navbar">
                <NavbarBrand className="mr-auto">
                    <img src='/images/logo.png' />
                </NavbarBrand>
                <Nav>
                    <NavItem>
                        <NavLink href="">Manage</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/planpage">Plan</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="">Ticket</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="">History</NavLink>
                    </NavItem>
                </Nav>
                <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                <Collapse isOpen={this.state.collapsed} navbar>
                    <Nav navbar>
                        <NavItem>
                            <NavLink href='/profile'>Profile</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href=''>Setting</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href='' onClick={this.onLogout}>Logout</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>            
        );
    }
}
 
export default withRouter(NavBar);