import * as PledgeApiUtil from "../util/pledge_api_util";

export const CREATE_PLEDGE = "CREATE_PLEDGE";
export const CREATE_PLEDGE_SUCCESS = "CREATE_PLEDGE_SUCCESS";
export const CREATE_PLEDGE_FAILED = "CREATE_PLEDGE_FAILED";
export const EDIT_PLEDGE = "EDIT_PLEDGE";
export const EDIT_PLEDGE_SUCCESS = "EDIT_PLEDGE_SUCCESS";
export const EDIT_PLEDGE_FAILED = "EDIT_PLEDGE_FAILED";
export const DELETE_PLEDGE = "DELETE_PLEDGE";
export const DELETE_PLEDGE_SUCCESS = "DELETE_PLEDGE_SUCCESS";
export const DELETE_PLEDGE_FAILED = "DELETE_PLEDGE_FAILED";
export const RECEIVE_NEW_PLEDGE = "RECEIVE_NEW_PLEDGE";
export const RECEIVE_PLEDGES = "RECEIVE_PLEDGES";
export const RECEIVE_PLEDGE = "RECEIVE_PLEDGE";
export const RECEIVE_USER_PLEDGES = "RECEIVE_USER_PLEDGES";
export const REMOVE_PLEDGE = "REMOVE_PLEDGE";
export const RECEIVE_SHOW_PLEDGE = "RECEIVE_SHOW_PLEDGE";
export const COMMENT_ON_PLEDGE = "COMMENT_ON_PLEDGE";

export const editPledge = () => ({
  type: EDIT_PLEDGE,
});

export const editPledgeSuccess = (updatedPledge) => ({
  type: EDIT_PLEDGE_SUCCESS,
  payload: updatedPledge,
});

export const editPledgeFailed = (err) => ({
  type: EDIT_PLEDGE_FAILED,
  payload: err,
});

export const createPledgeSuccess = (newPledge) => ({
  type: CREATE_PLEDGE_SUCCESS,
  payload: newPledge,
});

export const createPledgeFailed = (err) => ({
  type: CREATE_PLEDGE_FAILED,
  payload: err,
});

export const editPledgeAction = (patch, dispatch) => {
  PledgeApiUtil.patchPledge(patch).then((res) => {
    if (res.status === 200) {
      dispatch(editPledgeSuccess(res.data));
    } else {
      dispatch(editPledgeFailed(res.data));
    }
  });
};

export const createPledgeAction = (data) => async (dispatch) => {
  try {
    const res = await PledgeApiUtil.createPledge(data);
    dispatch(createPledgeSuccess(res.data));
  } catch (err) {
    dispatch(createPledgeFailed(err));
  }
};

// //constants

// //action creators
const receivePledges = (pledges) => ({
  type: RECEIVE_PLEDGES,
  pledges,
});

const receiveUserPledges = (pledges) => ({
  type: RECEIVE_USER_PLEDGES,
  pledges,
});

const receivePledge = (pledge) => ({
  type: RECEIVE_PLEDGE,
  pledge,
});

const receiveShowPledge = (pledge) => ({
  type: RECEIVE_SHOW_PLEDGE,
  pledge,
});

const receiveNewPledge = (pledge) => ({
  type: RECEIVE_NEW_PLEDGE,
  pledge,
});

const removePledge = (pledgeId) => ({
  type: REMOVE_PLEDGE,
  pledgeId,
});

// const commentOnPledgeAction = (pledgeId, comment) => ({
//   type: COMMENT_ON_PLEDGE,
//   pledgeId,
//   comment
// })

// //thunk actions

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

// export const editPledge = (id) => (dispatch) =>
//   PledgeApiUtil.updatePledge(id)
//     .then((pledge) => dispatch(receivePledge(pledge)))
//     .catch((err) => console.log(err));

export const deletePledge = (id) => (dispatch) =>
  PledgeApiUtil.deletePledge(id)
    .then(() => dispatch(removePledge(id)))
    .catch((err) => console.log(err));

export const followPledge = (pledgeId) => (dispatch) =>
  PledgeApiUtil.followPledge(pledgeId)
    .then((pledge) => dispatch(receivePledge(pledge)))
    .catch((err) => console.log(err));

export const unfollowPledge = (pledgeId) => (dispatch) =>
  PledgeApiUtil.unfollowPledge(pledgeId)
    .then((pledge) => dispatch(receivePledge(pledge)))
    .catch((err) => console.log(err));

export const showPledge = (pledgeId) => (dispatch) =>
  PledgeApiUtil.getPledge(pledgeId)
    .then((pledge) => dispatch(receiveShowPledge(pledge)))
    .catch((err) => console.log(err));


// COMMENT ACTIONS
export const createCommentOnPledge = ({pledgeId, ...comment}) => (dispatch) => 
  PledgeApiUtil.createCommentOnPledge({pledgeId, ...comment})
    .then((pledge) => dispatch(receiveShowPledge(pledge)))
    .catch((err) => console.log(err));

export const editCommentOnPledge = ({pledgeId, commentId, text}) => (dispatch) => 
  PledgeApiUtil.editCommentOnPledge({pledgeId, commentId, text})
    .then((pledge) => dispatch(receiveShowPledge(pledge)))
    .catch((err) => console.log(err));

export const deleteComment = ({pledgeId, commentId}) => (dispatch) =>
  PledgeApiUtil.deleteComment({pledgeId, commentId})
    .then((pledge) => dispatch(receiveShowPledge(pledge)))
    .catch((err) => console.log(err));