// Coloque aqui suas actions
import { USER, WALLET } from './actionTypes';

export const userAction = (payload) => ({
  type: USER,
  payload,
});

export const walletAction = (payload) => ({
  type: WALLET,
  payload,
});
