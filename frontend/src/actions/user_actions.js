import * as APIUtil from "../util/user_api_util";
import jwt_decode from "jwt-decode";

export const GET_ALL_USERS = "GET_ALL_USERS";
export const GET_ALL_USERS_SUCCESS = "GET_ALL_USERS_SUCCESS";
export const GET_ALL_USERS_FAILURE = "GET_ALL_USERS_FAILURE";

/*// Dispatch this when our user signs in
export const receiveCurrentUser = (currentUser) => ({
  type: RECEIVE_CURRENT_USER,
  currentUser,
});

// This will redirect the user to the login page after signing up
export const receiveUserSignIn = () => ({
  type: RECEIVE_USER_SIGN_IN,
});

// Dispatch this to show auth errors on the frontend
export const receiveErrors = (errors) => ({
  type: RECEIVE_SESSION_ERRORS,
  errors,
});

// When the user logs out, dispatch this action to set isAuthenticated to false
export const logoutUser = () => ({
  type: RECEIVE_USER_LOGOUT,
});

// Upon signup, dispatch the approporiate action depending on which type of response we receieve from the backend
export const signup = (user) => (dispatch) =>
  APIUtil.signup(user).then(
    () => dispatch(receiveUserSignIn()),
    (err) => dispatch(receiveErrors(err.response.data))
  );

// Upon login, set the session token and dispatch the current user. Dispatch errors on failure.
export const login = (user) => (dispatch) =>
  APIUtil.login(user)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      APIUtil.setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(receiveCurrentUser(decoded));
    })
    .catch((err) => {
      dispatch(receiveErrors(err.response.data));
    });

export const logout = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  APIUtil.setAuthToken(false);
  dispatch(logoutUser());
};*/

export const getAllUsersSuccess = (users) => ({
  type: GET_ALL_USERS_SUCCESS,
  payload: users,
});

export const getAllUsersFailure = (errors) => ({
  type: GET_ALL_USERS_FAILURE,
  payload: errors,
});

export const getAllUsers = () => (dispatch) =>
  APIUtil.getAllUsers()
    .then((res) => {
      dispatch(getAllUsersSuccess(res.data));
    })
    .catch((err) => {
      dispatch(getAllUsersFailure(err.response.data));
    });