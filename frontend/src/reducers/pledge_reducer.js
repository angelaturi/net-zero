import {
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

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
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
        pledges: state.data.concat(payload),
      };
    }

    default:
      return state;
  }
}
