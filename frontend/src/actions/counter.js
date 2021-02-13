export const COUNTER_INCREMENTED = 'COUNTER_INCREMENTED';
export const COUNTER_DECREMENTED = 'COUNTER_DECREMENTED';

export const incrementCounter = () => {
  return dispatch => {
    dispatch({ type: COUNTER_INCREMENTED });
  };
};

export const decrementCounter = () => {
  return dispatch => {
    dispatch({ type: COUNTER_DECREMENTED });
  };
};
