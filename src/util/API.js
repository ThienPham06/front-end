import {ACCESS_TOKEN } from '../constant';


const axios = require('axios').default;
const querystring = require('querystring');
// axios.defaults.baseURL = "http://localhost:1234/api";
axios.defaults.headers.common['Authorization'] = ACCESS_TOKEN;

export async function login(username, password, role) {
    return await axios.post('http://localhost:1234/api/auth/signin', {
        usernameOrId:username,
        password:password,
        adminOrStudent:role
    })
      .then(function (response) {
        console.log(response); // Xử lý dữ liệu được trả về từ API
      })
      .catch(function (error) {
        console.log(error); // Xử lý lỗi
      });
}


