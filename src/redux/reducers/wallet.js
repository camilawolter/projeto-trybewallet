// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { WALLET } from '../actions/actionTypes';

const INITIAL_STATE = {
  wallet: {
    currencies: [], // array de string
    expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
    editor: false, // valor booleano que indica de uma despesa está sendo editada
    idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  },
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case WALLET:
    return {
      ...state,
      ...action.payload,
    };
  default:
    return state;
  }
}

export default walletReducer;
