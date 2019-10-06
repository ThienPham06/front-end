import * as types from './../constant/ActionTypes'

var plans = JSON.parse(localStorage.getItem("availablePlans"));
var initialState = plans ? plans : [];

var myReducer = (state = initialState, action) => {
    switch(action.type){
        case types.SELECT_PLAN:
            return planID = action.planID;
    }
        
}