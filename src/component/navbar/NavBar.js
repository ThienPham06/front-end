import React, { Component } from 'react';
import '../navbar/NavBar.css'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

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
                            <NavLink href=''>Profile</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href=''>Setting</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href=''>Logout</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>            
        );
    }
}
 
export default NavBar;