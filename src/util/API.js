import {ACCESS_TOKEN, API_BASE_URL } from '../constant';
import axios from 'axios';

axios.defaults.headers.common['Authorization'] = 'Bearer'+ ACCESS_TOKEN;
// axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.common['Accept'] = 'application/x-www-form-urlencoded;charset=utf-8';

export function login(username, password) {
    return axios.post(API_BASE_URL + '/auth/signin', {
        usernameOrId:username,
        password:password
    })
      .then(res => {      
        return res.status;
      })
      .catch(err => {
          if(err.response){
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
        .catch(err => {
            console.log(err);
        });
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

export async function getStudentById(studentId){
    return await axios.get(API_BASE_URL + '/profile/student/' + studentId, {
        studentId: studentId
    }).then(res=>{
        if(res.status===200&& res!=null){
            const std = res.data ? res.data : "STD-NaN";
            return std;
        }
    }).catch(err=>{
        return err.status;
    })
}

export async function getAdminById(adminId){
    return await axios.get(API_BASE_URL + '/profile/admin/' + adminId, {
        adminId: adminId
    }).then(res=>{
        if(res.status===200 && res!=null){
            const ad = res.data ? res.data : 'ADN-NaN'
            return ad;
        }
    }).catch(err=>{
        return err.status;
    })
}

export async function getStudentDetailById(studentId){
    return await axios.get(API_BASE_URL + '/profile/studentdetail/'+studentId, {
        studentId: studentId
    }).then(res=>{
        if(res.status===200&&res!=null){
            const stdl = res.data;
            return stdl;
        }
    }).catch(err=>{
        return err.status;
    })
}

export function createRequest(planRequest){
    return axios.post(API_BASE_URL + '/plans', planRequest,
    ).then(res=>{
        return res.data.success;
    }).catch(err=>{
        return err.status;
    })
} 

