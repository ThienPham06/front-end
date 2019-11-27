import React, {Component } from 'react';
import Quagga from 'quagga';
import {approveTicket, createTicket, getTicketForScan, createCheckedTicket} from '../../util/API';
import swal from '@sweetalert/with-react';

class Scanner extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            planid:'',
            list_studentids:[],
            ticket:[],
            scanRes:'',
            ticketId:'',
            ticketRequest: {
              planId:'', studentId:''
          },
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
            Quagga.start();
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

    handleCreateNewTicket = (y, x) => {
      const {ticketRequest} = this.state;
      ticketRequest.planId = y;
      ticketRequest.studentId = x;
      createCheckedTicket(ticketRequest).then(res=>{
        if(res==="sc"){
          swal({
            title: "Thành công!",
            text: "Đã tạo phiếu đăng kí và xác nhận cho sinh viên!",
            icon: "success",
            button:"OK"            
          }).then(()=>{
            this.openScanner()
          })
        }else{
          swal({
            title: "Lỗi!",
            text: "Đã có lỗi xảy ra! Vui lòng thử lại!",
            icon: "error",
            button:"OK"             
          }).then(()=>{
            this.openScanner()
          })
        }
      })
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
        }else {
          swal({
                title: "nooo!",
                text: "Sinh viên với mã số " + result.codeResult.code + " chưa có phiếu đăng ký! Tạo phiếu đăng ký ?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              }).then((value)=>{
                if(value){
                  this.handleCreateNewTicket(this.state.planid , result.codeResult.code);
                }else {
                  this.openScanner()
                }
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