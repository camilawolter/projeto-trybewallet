// Coloque aqui suas actions
import getCurrenciesAPI from './fetchCurrenciesAPI';
import {
  USER, CURRENCIES, REQUEST_API, SUCCES_API, ERROR_API, EXPENSES } from './actionTypes';

export const userAction = (payload) => ({
  type: USER,
  payload,
});

export const currenciesAction = (currencies) => ({
  type: CURRENCIES,
  currencies,
});

export const requestAPI = () => ({
  type: REQUEST_API,
});

export const succesAPI = (data) => ({
  type: SUCCES_API,
  data,
});

export const errorAPI = (error) => ({
  type: ERROR_API,
  error,
});

export function fetchAPI() {
  return async (dispatch) => {
    try {
      dispatch(requestAPI());
      const data = await getCurrenciesAPI();
      dispatch(succesAPI(data));
    } catch (error) {
      dispatch(errorAPI(error));
    }
  };
}

export const changeExpenses = (payload) => ({
  type: EXPENSES,
  payload,
});
