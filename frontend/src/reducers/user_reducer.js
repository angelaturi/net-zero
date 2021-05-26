import {
  RECEIVE_CURRENT_USER,
  RECEIVE_USER_LOGOUT,
  RECEIVE_USER_SIGN_IN,
} from "../actions/session_actions";
import { GET_ALL_USERS_SUCCESS } from "../actions/user_actions";

const initialState = {
  data: [],
  error: "",
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_USERS_SUCCESS: {
      return { ...state, data: payload };
    }

    default:
      return state;
  }
}
