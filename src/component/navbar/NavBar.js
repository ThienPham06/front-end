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
        let ticketHref;
        if(sessionStorage.getItem('role')==="ADMIN")
            ticketHref = "/ticketpage"
        else if(sessionStorage.getItem('role')==="STUDENT")
            ticketHref = "/notfound"

        let historyHref;
        if(sessionStorage.getItem('role')==="ADMIN")
            historyHref="/adhistory"
        else if(sessionStorage.getItem('role')==="STUDENT")
            historyHref="/sthistory"

        return ( 
            <Navbar color="light" light >
                <NavbarBrand className="mr-auto"  href='/home'>
                    <img src='/images/logo.png' /> HỆ THỐNG QUẢN LÍ HIẾN MÁU 
                </NavbarBrand>
                <Nav>
                    <NavItem className="db">
                        <FontAwesomeIcon icon={faDatabase} /> <a href="">Thống kê</a>
                    </NavItem>
                    <NavItem className="pl">
                        <FontAwesomeIcon icon={faFileAlt} /> <a href="/planpage">Lịch hiến máu </a>
                        <Badge className="notify" color="danger" pill>
                            {this.props.planCounting}
                        </Badge>
                    </NavItem>
                    <NavItem className="tk">
                        <FontAwesomeIcon icon={faFileMedical} /> <a href={ticketHref}>Xác nhận phiếu</a>
                        <Badge className="notify" color="danger" pill>
                            {this.props.closedPlanCounting}
                        </Badge>
                    </NavItem>
                    <NavItem className="hs">
                        <FontAwesomeIcon icon={faHistory} /> <a href={historyHref}>Lịch sử</a>
                    </NavItem>
                </Nav>
                <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                <Collapse isOpen={this.state.collapsed} navbar>
                    <Nav navbar>
                        <NavItem>
                            <i className="fa fa-user-circle"></i>
                            <NavLink href='/profile'>Thông tin cá nhân</NavLink>
                        </NavItem>
                        <NavItem>
                            <i className="fa fa-cog"></i>
                            <NavLink href=''>Cài đặt</NavLink>
                        </NavItem>
                        <NavItem>
                            <i className="fa fa-sign-out-alt"></i>
                            <NavLink href='' onClick={this.onLogout}>Đăng xuất</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>            
        );
    }
}
 
export default withRouter(NavBar);