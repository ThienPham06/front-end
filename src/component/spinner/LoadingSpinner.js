import React, { Component } from 'react';
import { Spinner } from 'reactstrap';

class LoadingSpinner extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                <Spinner className="spn" type="grow" color="light" />
                <Spinner className="spn" type="grow" color="secondary" />
                <Spinner className="spn" type="grow" color="dark" />
            </div>
        );
    }
}
 
export default LoadingSpinner;