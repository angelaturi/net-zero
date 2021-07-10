import * as APIUtil from "../util/user_api_util";

export const RECEIVE_NOTES = "RECEIVE_NOTES";

const receiveUsers = (users) => ({
  type: RECEIVE_NOTES,
  users
});

export const fetchUsers = () => (dispatch) => (
  APIUtil.getAllUsers()
    .then((users) => dispatch(receiveUsers(users)))
);
  