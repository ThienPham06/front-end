import {ACCESS_TOKEN, API_BASE_URL } from '../constant';

const axios = require('axios').default;
// axios.defaults.baseURL = "http://localhost:1234/api";
axios.defaults.headers.common['Authorization'] = ACCESS_TOKEN;

export async function login(username, password, role) {
    return await axios.post(API_BASE_URL + '/auth/signin', {
        usernameOrId:username,
        password:password,
        adminOrStudent:role
    })
      .then(res => {
          console.log(res.status);
          const status = res.status;
          return status;       
      })
      .catch(err => {
          if(err.response){
            //   console.log(err.response.status);
              const status = err.response.status;
              return status;
          }
          else if (err.request){
              console.log(err.request);   
          }

      });
}

export async function getAllPlans(){
    return await axios.get(API_BASE_URL + '/plans')
        .then(res =>{
            if(res.status===200 && res!=null){
                const plans = res.data;
                return plans;
            }
        })
        .catch(err => {
            console.log(err);
        });
}

export async function getPlanByState(planState) {
    return await axios.get(API_BASE_URL + '/plans/state?planState='+ planState, {
        planState:planState
    })
        .then(res => {
            if(res.status===200){
                const plans = res.data;
                return plans;
            }   
        })
 
}

export async function getPlanById(planId){
    return await axios.get(API_BASE_URL + '/plans/' + planId, {
        planId:planId
    })
        .then(res => {
            if(res.status===200 && res!=null){
                const plan = res.data;
                return plan;
            }
        }).catch(err => {
            console.log(err)
        })
}

export async function getPlandetailByPlanId(planId){
    return await axios.get(API_BASE_URL + '/plans/plandetail/' + planId, {
        planId:planId
    })
        .then(res => {
            if(res.status===200 && res!=null){
                const plandetail = res.data;
                return plandetail;
            }
        })
}

