import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import SlideShow from '../sildeshow/SlideShow';
import './HomePage.css';
import NavBar from '../navbar/NavBar';
import {getAdminById} from '../../util/API';
import LoadingSpinner from '../spinner/LoadingSpinner';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            currentRole:''
        }
    }

    setRole = () => {
        const id = sessionStorage.getItem("id");
        getAdminById(id).then(res=>{
            if(res==='ADN-NaN'){
                this.setState({currentRole: "STUDENT"});
            }
            else {
                this.setState({currentRole: "ADMIN"})
            }
            sessionStorage.setItem("role", this.state.currentRole);
            console.log(sessionStorage.getItem("role"));
        })   
    }

    componentDidMount(){
        this.setRole();
        this.setState({isLoading:false})
    }

    render() { 
        if(this.state.isLoading)
            return(
                <LoadingSpinner />
            )
        else {
        return ( 
        <div>
            <NavBar planCounting={sessionStorage.getItem("wtPlan")}/>
            <SlideShow />
        </div>
        );
        }
    }
}
 
export default withRouter(HomePage);