import React from "react";
import "./App.css";
import LoginForm from "../component/login/LoginForm";
import { Container, Row, Col} from "reactstrap";
import LoginNav from "../component/loginnav/LoginNav";
import { Footer } from "../component/footer/Footer";


function App() {
  return (
    <div className="App">
      <LoginNav /><br></br><br></br>
      <Container>
        <Row>
          <Col xs="6" sm="8">
            <div className="iimg">
              <img src="/images/loginImg.jpg" />
            </div><br></br>
          <div className='text'>
            <p>
            Với sự kết nối với máy chủ của trường. 
            Giờ đây bạn có thể đăng nhập bằng chính tài khoản có sẵn của Trung tâm Thông tin và quản trị mạng
             (tài khoản đăng nhập máy tính) vào hệ thống quản lí hiến máu nhân đạo Đại học Cần Thơ.
            </p>
          </div>
          </Col>
          <Col sm="4">
            <LoginForm/>
          </Col>

        </Row>

      </Container>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
