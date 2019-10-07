import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import NavBar from '../navbar/NavBar';
import Profile from './Profile';
import cookie from 'react-cookies'

class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            userID: ''
        }
    }

    render() { 
        return ( 
        <div>
            <NavBar />
            <Profile userID={this.state.userID}/>
        </div>
        );
    }
}
 
export default withRouter(ProfilePage);