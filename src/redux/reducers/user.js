// Esse reducer será responsável por tratar as informações da pessoa usuária
import { USER } from '../actions/actionTypes';

const INITIAL_STATE = {
  user: {
    email: '', // string que armazena o email da pessoa usuária
  },
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER:
    return {
      email: action.payload,
    };
  default:
    return state;
  }
}

export default userReducer;
