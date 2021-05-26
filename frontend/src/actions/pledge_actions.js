// import {
//   getPledges,
//   getUserPledges,
//   getPledge,
//   createPledge,
//   updatePledge,
//   deletePledge,
// } from "../util/pledge_api_util";

import * as PledgeApiUtil from "../util/pledge_api_util";

//constants
export const RECEIVE_PLEDGES = "RECEIVE_PLEDGES";
export const RECEIVE_PLEDGE = "RECEIVE_PLEDGE";
export const RECEIVE_USER_PLEDGES = "RECEIVE_USER_PLEDGES";
export const RECEIVE_NEW_PLEDGE = "RECEIVE_NEW_PLEDGE";
export const REMOVE_PLEDGE = "REMOVE_PLEDGE";

//action creators
export const receivePledges = (pledges) => ({
  type: RECEIVE_PLEDGES,
  pledges,
});

export const receiveUserPledges = (pledges) => ({
  type: RECEIVE_USER_PLEDGES,
  pledges,
});

export const receivePledge = (pledge) => ({
    type: RECEIVE_PLEDGE,
    pledge,
  });

export const receiveNewPledge = (pledge) => ({
  type: RECEIVE_NEW_PLEDGE,
  pledge,
});

export const removePledge = (pledgeId) => ({
  type: REMOVE_PLEDGE,
  pledgeId,
});

//thunk actions
export const fetchPledges = () => (dispatch) =>
  PledgeApiUtil.getPledges()
    .then((pledges) => dispatch(receivePledges(pledges)))
    .catch((err) => console.log(err));

export const fetchUserPledges = (id) => (dispatch) =>
  PledgeApiUtil.getUserPledges()
    .then((pledges) => dispatch(receiveUserPledges(pledges)))
    .catch((err) => console.log(err));

export const fetchPledge = (id) => (dispatch) =>
  PledgeApiUtil.getPledge(id)
    .then((pledge) => dispatch(receivePledge(pledge)))
    .catch((err) => console.log(err));

export const makePledge = (id) => (dispatch) =>
  PledgeApiUtil.createPledge(id)
    .then((pledge) => dispatch(receivePledge(pledge)))
    .catch((err) => console.log(err));

export const editPledge = (id) => (dispatch) =>
  PledgeApiUtil.updatePledge(id)
    .then((pledge) => dispatch(receivePledge(pledge)))
    .catch((err) => console.log(err));

export const deletePledge = (id) => (dispatch) =>
  PledgeApiUtil.deletePledge(id)
    .then((pledge) => dispatch(removePledge(pledge)))
    .catch((err) => console.log(err));
