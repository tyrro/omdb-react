import { COUNTER_INCREMENTED, COUNTER_DECREMENTED } from '../actions/counter';

export const counter = (state = { count: 0 }, action) => {
  switch (action.type) {
    case COUNTER_INCREMENTED:
      return { ...state, count: state.count + 1 };
    case COUNTER_DECREMENTED:
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
};
