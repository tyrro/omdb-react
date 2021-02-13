export const POPULATE_USER = 'POPULATE_USER';
export const REMOVE_USER = 'REMOVE_USER';

export const populateUser = data => {
  return dispatch => {
    dispatch({ type: POPULATE_USER, data });
  };
};

export const removeUser = data => {
  return dispatch => {
    dispatch({ type: REMOVE_USER, data });
  };
};
