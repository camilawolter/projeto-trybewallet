// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  CURRENCIES,
  REQUEST_API, SUCCES_API, ERROR_API, EXPENSES } from '../actions/actionTypes';

const INITIAL_STATE = {
  wallet: {
    currencies: [], // array de string
    expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
    editor: false, // valor booleano que indica de uma despesa está sendo editada
    idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
    error: '',
  },
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case CURRENCIES:
    return {
      ...state,
      currencies: action.currencies,
    };
  case REQUEST_API:
    return {
      ...state,
    };
  case SUCCES_API:
    return {
      ...state,
      currencies: Object.values(action.data)
        .filter(({ codein }) => codein !== 'BRLT')
        .map(({ code }) => code),
    };
  case ERROR_API:
    return {
      ...state };
  case EXPENSES:
    return {
      ...state,
      expenses: [...(state.expenses || []), action.payload],
    };
  default:
    return state;
  }
}

export default walletReducer;
