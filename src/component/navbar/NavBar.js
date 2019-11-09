import React, { Component } from 'react';
import '../navbar/NavBar.css'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Badge } from 'reactstrap';
import {ACCESS_TOKEN } from '../../constant/index.js';
import {withRouter} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDatabase, faFileAlt, faHistory, faFileMedical } from '@fortawesome/free-solid-svg-icons';

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
        sessionStorage.clear();
        this.props.history.push('/');
    }

    render() { 
        let ticketNav;
        if(sessionStorage.getItem('role')==="ADMIN")
            ticketNav = <a href="/ticketpage">Check</a>
        else if(sessionStorage.getItem('role')==="STUDENT")
            ticketNav = <a href="/notfound">Check</a>

        return ( 
            <Navbar color="light" light >
                <NavbarBrand className="mr-auto"  href='/home'>
                    <img src='/images/logo.png' /> HỆ THỐNG QUẢN LÍ HIẾN MÁU 
                </NavbarBrand>
                <Nav>
                    <NavItem className="db">
                        <FontAwesomeIcon icon={faDatabase} /> <a href="">Dashboard</a>
                    </NavItem>
                    <NavItem className="pl">
                        <FontAwesomeIcon icon={faFileAlt} /> <a href="/planpage">Plan</a>
                        <Badge className="notify" color="danger" pill>
                            {this.props.planCounting}
                        </Badge>
                    </NavItem>
                    <NavItem className="tk">
                        <FontAwesomeIcon icon={faFileMedical} /> {ticketNav}
                        <Badge className="notify" color="danger" pill>
                            {this.props.closedPlanCounting}
                        </Badge>
                    </NavItem>
                    <NavItem className="hs">
                        <FontAwesomeIcon icon={faHistory} /> <a href="/history">History</a>
                    </NavItem>
                </Nav>
                <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                <Collapse isOpen={this.state.collapsed} navbar>
                    <Nav navbar>
                        <NavItem>
                            <i className="fa fa-user-circle"></i>
                            <NavLink href='/profile'>Profile</NavLink>
                        </NavItem>
                        <NavItem>
                            <i className="fa fa-cog"></i>
                            <NavLink href=''>Setting</NavLink>
                        </NavItem>
                        <NavItem>
                            <i className="fa fa-sign-out-alt"></i>
                            <NavLink href='' onClick={this.onLogout}>Logout</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>            
        );
    }
}
 
export default withRouter(NavBar);