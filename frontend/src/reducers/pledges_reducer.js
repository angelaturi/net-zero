import {
  RECEIVE_PLEDGES,
  RECEIVE_PLEDGE,
  RECEIVE_USER_PLEDGES,
  RECEIVE_NEW_PLEDGE,
  REMOVE_PLEDGE,
  EDIT_PLEDGE_SUCCESS,
  CREATE_PLEDGE_SUCCESS,
} from "../actions/pledge_actions";

const DEFAULT_PLEDGES = [
  {
    id: "1",
    title: "Use the dishwasher",
    description:
      "1Dishwashers use ½ the energy and ⅓rd of the water as handwashing. Finally, the perfect excuse for not doing the dishes.",
    state: "completed",
    public: true,
  },
  {
    id: "2",
    title: "Use the dishwasher",
    description:
      "2Dishwashers use ½ the energy and ⅓rd of the water as handwashing. Finally, the perfect excuse for not doing the dishes.",
    state: "pending",
    public: true,
  },
  {
    id: "3",
    title: "Use the dishwasher",
    description:
      "3Dishwashers use ½ the energy and ⅓rd of the water as handwashing. Finally, the perfect excuse for not doing the dishes.",
    state: "completed",
    public: false,
  },
  {
    id: "4",
    title: "Use the dishwasher",
    description:
      "4Dishwashers use ½ the energy and ⅓rd of the water as handwashing. Finally, the perfect excuse for not doing the dishes.",
    state: "pending",
    public: false,
  },
];

const initialState = DEFAULT_PLEDGES;

const PledgesReducer = (
  state = { all: [], user: {}, new: undefined },
  action
) => {
  Object.freeze(state);
  const { type, payload } = action;
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_PLEDGES:
      newState.all = action.pledges.data;
      return newState;
    case RECEIVE_PLEDGE:
      newState.show = action.pledge.data;
      return newState;
    case RECEIVE_USER_PLEDGES:
      newState.user = action.pledges.data;
      return newState;
    case RECEIVE_NEW_PLEDGE:
      newState.new = action.pledge.data;
      return newState;
    case REMOVE_PLEDGE:
      delete newState.all[action.pledgeId];
      return newState;
    case EDIT_PLEDGE_SUCCESS:
      const { id, ...rest } = payload;
      const pledge = state.find((pledge) => pledge.id === id);
      const updatedPledge = {
        ...pledge,
        ...rest,
      };
      const pledgesWithoutCurrent = state.filter((pledge) => pledge.id !== id);
      return [...pledgesWithoutCurrent, updatedPledge];
    case CREATE_PLEDGE_SUCCESS: {
      return {
        ...state,
        all: [payload, ...state.all],
      };
    }
    default:
      return state;
  }
};

export default PledgesReducer;
