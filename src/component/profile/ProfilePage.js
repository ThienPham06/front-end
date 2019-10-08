import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import NavBar from '../navbar/NavBar';
import Profile from './Profile';

class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
        }
    }

    render() { 
        return ( 
        <div>
            <NavBar /><br></br>
            <Profile />
        </div>
        );
    }
}
 
export default withRouter(ProfilePage);