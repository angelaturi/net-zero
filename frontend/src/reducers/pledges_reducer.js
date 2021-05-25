import {
  RECEIVE_PLEDGES,
  RECEIVE_USER_PLEDGES,
  RECEIVE_NEW_PLEDGE,
} from "../actions/pledge_actions";

const PledgesReducer = (state = { all: {}, user: {}, new: undefined}, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch(action.type) {
    case RECEIVE_PLEDGES:
      newState.all = action.pledges.data;
      return newState;
    case RECEIVE_USER_PLEDGES:
      newState.user = action.pledges.data;
      return newState;
    case RECEIVE_NEW_PLEDGE:
      newState.new = action.pledge.data
      return newState;
    default:
      return state;
  }
};

export default PledgesReducer;
