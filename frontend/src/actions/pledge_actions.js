import { patchPledge, createPledge } from "../util/pledge_api_utils";

export const CREATE_PLEDGE = "CREATE_PLEDGE";
export const CREATE_PLEDGE_SUCCESS = "CREATE_PLEDGE_SUCCESS";
export const CREATE_PLEDGE_FAILED = "CREATE_PLEDGE_FAILED";
export const EDIT_PLEDGE = "EDIT_PLEDGE";
export const EDIT_PLEDGE_SUCCESS = "EDIT_PLEDGE_SUCCESS";
export const EDIT_PLEDGE_FAILED = "EDIT_PLEDGE_FAILED";
export const DELETE_PLEDGE = "DELETE_PLEDGE";
export const DELETE_PLEDGE_SUCCESS = "DELETE_PLEDGE_SUCCESS";
export const DELETE_PLEDGE_FAILED = "DELETE_PLEDGE_FAILED";

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
  dispatch(editPledgeSuccess(patch));
  // dispatch(editPledge())
  // patchPledge(patch)
  //     .then(res => {
  //         if (res.status === 200) {
  //             dispatch(editPledgeSuccess(res.data))
  //         } else {
  //             dispatch(editPledgeFailed(res.data))
  //         }
  //     })
};

export const createPledgeAction = (data) => async (dispatch) => {
    console.log('data==>>', data, 'dis', dispatch)
  try {
    const res = await createPledge(data);
    dispatch(editPledgeSuccess(res.data));
  } catch (err) {
    dispatch(editPledgeFailed(err));
  }
};
