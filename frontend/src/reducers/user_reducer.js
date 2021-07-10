import { RECEIVE_NOTES } from "../actions/user_actions";

const initialState = {
  data: [],
  error: "",
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case RECEIVE_NOTES: {
      return { ...state, data: payload };
    }

    default:
      return state;
  }
}
