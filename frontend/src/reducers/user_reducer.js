import { RECEIVE_USERS } from "../actions/user_actions";

const initialState = {
  data: [],
  error: "",
};

export default function (state = initialState, action) {

  switch (action.type) {
    case RECEIVE_USERS: 
      return action.users.data;

    default:
      return state;
  }
}
