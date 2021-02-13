import { POPULATE_USER, REMOVE_USER } from '../actions/user';

const user = (state = null, action) => {
  switch (action.type) {
    case POPULATE_USER:
      return { ...state, ...action.data };
    case REMOVE_USER:
      return null;
    default:
      return state;
  }
};

export default user;
