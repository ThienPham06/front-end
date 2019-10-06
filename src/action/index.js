import * as types from './../constant/ActionTypes'

export const selectPlan = (planID) => {
    return {
        type: types.SELECT_PLAN,
        planID
    }
}