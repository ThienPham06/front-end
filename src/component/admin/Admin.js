import React, { Component } from 'react';
// import { Plans } from '../plan/Plans.js'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { getAllPlans } from '../../util/API.js'

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isLoading: false,
            collapsed: true,
            plans: []
        }
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.loadList = this.loadList.bind(this);
    }

    toggleNavbar() {
        this.setState({
          collapsed: !this.state.collapsed
        });
    };

    loadList() {
        getAllPlans().then(response => {
            this.setState({plans: response});
        }
    )};

    componentDidMount(){
        this.loadList();
    }
    

    render() { 
        return ( 
        <div>
            <div>
                <Navbar color="faded" light>
                    <NavbarBrand className="mr-auto">Administrator</NavbarBrand>
                    <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                    <Collapse isOpen={!this.state.collapsed} navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink href=''>Profile</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href=''>Approve plans</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href=''>Approve tickets</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
            <div>
                <ListGroup>
                    { this.state.plans.map(function(plan, index){
                        return(
                            <ListGroupItem key={index}> { plan.planId } </ListGroupItem>
                        );
                    }) }
                </ListGroup>
            </div>
        </div>
        );
    }
}
 
export default Admin;