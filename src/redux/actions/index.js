// Coloque aqui suas actions
import { USER, CURRENCIES, REQUEST_API, SUCCES_API, ERROR_API } from './actionTypes';

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
      const responseURL = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await responseURL.json();
      dispatch(succesAPI(data));
    } catch (error) {
      dispatch(errorAPI(error));
    }
  };
}
