import React, {Component } from 'react';
import Quagga from 'quagga';
// import {Modal, ModalBody, ModalHeader, ModalFooter, Button, Table, Input} from 'reactstrap';

class Scanner extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            
         }
    }


    componentDidMount(){
        Quagga.init(
            {
              inputStream: {
                type: "LiveStream",
                constraints: {
                  width: 325,
                  height: 300,
                  facingMode: "environment" // or user
                }
              },
              locator: {
                patchSize: "medium",
                halfSample: true
              },
              numOfWorkers: 4,
              decoder: {
                readers: ["code_128_reader",
                "code_39_reader",
                "code_39_vin_reader",
                "ean_8_reader",
                "i2of5_reader"]
              },
              locate: true
            },
            function(err) {
              if (err) {
                return console.log(err);
              }
              Quagga.start();
            }
          );
          Quagga.onDetected(this._onDetected);
    }

    componentWillUnmount() {
        Quagga.offDetected(this._onDetected);
    }
    
    _onDetected = result => {
        this.props.onDetected(result);
        console.log(result);
    };

    render() { 
        return ( 
            <div id="interactive" className="viewport" />
        );
    }
}
 
export default Scanner;