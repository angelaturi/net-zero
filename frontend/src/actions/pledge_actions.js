import {
    getPledges,
    getUserPledges,
    createPledge,
    updatePledge,
    deletePledge
} from '../util/pledge_api_util';

//constants
export const RECEIVE_PLEDGES = "RECEIVE_PLEDGES";
export const RECEIVE_USER_PLEDGES = "RECEIVE_USER_PLEDGES";
export const RECEIVE_NEW_PLEDGE = "RECEIVE_NEW_PLEDGE";

//action creators
export const receivePledges = pledges => ({
    type: RECEIVE_PLEDGES,
    pledges
})

export const receiveUserPledges = pledges => ({
    type: RECEIVE_USER_PLEDGES,
    pledges
})

export const receiveNewPledge = pledge => ({
    type: RECEIVE_NEW_PLEDGE,
    pledge
})

//thunk actions
export const fetchPledges = () => dispatch => (
    getPledges()
    .then((pledges) => dispatch(receivePledges(pledges)))
    .catch(err => console.log(err))
)