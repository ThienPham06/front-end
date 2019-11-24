import React, {Component } from 'react';
import Quagga from 'quagga';
import {approveTicket, rejectTicket, getWaitingStudentIds, getTicketForScan} from '../../util/API';
import swal from '@sweetalert/with-react';

class Scanner extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            planid:'',
            list_studentids:[],
            ticket:[],
            scanRes:'',
            ticketId:''
         }
    }

    handleScanRegisteredTicket = () => {
      getTicketForScan(this.state.planid, this.state.scanRes).then(ress=>{
        this.setState({ticketId:ress.ticketId})

      approveTicket(ress.ticketId, sessionStorage.getItem('id')).then(res=>{
        if(res===true){
          swal({
            title: "Thành công!",
            text: "Phiếu đăng kí tham gia đã được xác nhận!",
            icon: "success",
            button:"OK"
          }).then(()=>{
            // this.toggle();
          });
        }else{
          swal({
              title: "Lỗi!",
              text: "Đã có lỗi xảy ra! Vui lòng thử lại!",
              icon: "error",
              button:"OK"
            })          
        }
      })
            });
    }

    openScanner = () => {
      Quagga.init(
        {
          inputStream: {
            type: "LiveStream",
            constraints: {
              width: 640,
              height: 480,
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

    componentDidMount(){
      this.openScanner();
      this.setState({planid:this.props.planid});
      console.log(this.props.studentidList);
      this.setState({list_studentids:this.props.studentidList})
      
    }

    componentWillUnmount() {
        Quagga.offDetected(this._onDetected);
    }
    
    _onDetected = result => {
        this.props.onDetected(result);
        console.log(result.codeResult.code);
        Quagga.stop();
        this.setState({scanRes:result.codeResult.code})
        if(this.state.list_studentids.includes(result.codeResult.code)){
          this.handleScanRegisteredTicket()
        //   swal({
        //     title: "ayesss!",
        //     text: "Đã nhận code",
        //     icon: "success",
        //     button:"OK"
        //   })
        // }else {
        //   swal({
        //     title: "nooo!",
        //     text: "Đéo nhận code",
        //     icon: "error",
        //     button:"OK"
        //   })          
        }else {
          swal({
                title: "nooo!",
                text: "Đéo nhận code",
                icon: "error",
                button:"OK"
              })           
        }

    };

    render() { 
        return ( 
            <div id="interactive" className="viewport" />
        );
    }
}
 
export default Scanner;