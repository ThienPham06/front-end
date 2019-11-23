import {ACCESS_TOKEN, API_BASE_URL } from '../constant';
import axios from 'axios';
import { async } from 'q';

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

export async function getAdminDetailById(adminId){
    return await axios.get(API_BASE_URL + '/profile/admindetail/' + adminId, {
        adminId:adminId
    }).then(res=>{
        if(res.status===200&&res!=null){
            const addt = res.data;
            return addt;
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

export async function approveRequest(planId, adminid){
    return axios.put(API_BASE_URL + '/plans/approve/' + planId, adminid,{
        planId:planId
    }).then(res=>{
        return res.data.success;
    }).catch(err=>{
        return err.status;
    })
}

export async function rejectRequest(planId, reason, adminId){
    return axios.put(API_BASE_URL + '/plans/reject/' + planId +'/' + adminId, reason, {
        planId:planId,
        adminId:adminId
    }).then(res=>{
        return res.data.success;
    }).catch(err=>{
        return err.status;
    })
}

export async function createTicket(ticketRequest){
    return axios.post(API_BASE_URL + '/tickets', ticketRequest
    ).then(res=>{
        return res.data.message;
    }).catch(err=>{
        return err.status;
    })
}

export async function countWaitingTicket(planid){
    return axios.get(API_BASE_URL + '/tickets/' + planid, {
        planid:planid
    }).then(res=>{
        return res;
    }).catch(err=>{
        return err.status;
    })
}

export async function getWaitingTickets(planid){
    return await axios.get(API_BASE_URL + '/tickets/waiting/' + planid, {
        planid:planid
    }).then(res=>{
        if(res.status===200)
            return res.data;
    }).catch(err=>{
        return err.status;
    })
}

export async function getStudentByTicket(ticketid){
    return await axios.get(API_BASE_URL + '/tickets/student/' + ticketid, {
        ticketid:ticketid
    }).then(res=>{
        if(res.status===200)
        return res.data;
    }).catch(err=>{
        return err.status;
    })
}

export async function approveTicket(ticketid, adminid){
    return await axios.put(API_BASE_URL + '/tickets/approve/' + ticketid + '/' + adminid,{
        ticketid:ticketid,
        adminid:adminid
    }).then(res=>{
        return res.data.success;
    }).catch(err=>{
        return err.status;
    })
}

export async function rejectTicket(ticketid, adminid, reason){
    return await axios.put(API_BASE_URL + '/tickets/reject/' + ticketid + '/' + adminid, reason,{
        ticketid:ticketid,
        adminid:adminid
    }).then(res=>{
        return res.data.success;
    }).catch(err=>{
        return err.status;
    })
}

export async function getClosedPlansCreateByAdmin(adminid){
    return await axios.get(API_BASE_URL + '/plans/createdAndClosed/' + adminid, {
        adminid:adminid
    }).then(res=>{
        return res.data;
    }).catch(err=>{
        return err.status;
    })
}

// export async function getClosedPlansCreateByAdmin(adminid){
//     return await axios.get(API_BASE_URL + '/createdAndClosed/' + adminid, {
//         adminid:aminid
//     }).then(res=>{
//         return res.data;
//     }).catch(err=>{
//         return err.status;
//     })
// }

export async function getWaitingPlansCreateByAdmin(adminid){
    return await axios.get(API_BASE_URL + '/plans/createdAndWaiting/' + adminid, {
        adminid:adminid
    }).then(res=>{
        return res.data; 
    }).catch(err=>{
        return err.status;
    })
}

export async function getApprovedPlanByChecker(adminid){
    return await axios.get(API_BASE_URL + '/plans/approvedBy/' + adminid, {
    }).then(res=>{
        return res.data; 
    }).catch(err=>{
        return err.status;
    })
}

export async function getPlansByStudent(studentId){
    return await axios.get(API_BASE_URL + '/plans/registered/' + studentId, {
    }).then(res=>{
        return res.data; 
    }).catch(err=>{
        return err.status;
    })
}