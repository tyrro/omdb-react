import { POPULATE_USER, REMOVE_USER } from '../actions/user';

const user = (state = {}, action) => {
  switch (action.type) {
    case POPULATE_USER:
      return { ...state, email: action.data.email, encryptedHash: action.data.encryptedHash };
    case REMOVE_USER:
      return { ...state };
    default:
      return state;
  }
};

export default user;
