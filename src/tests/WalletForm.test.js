import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWith';
import mockData from './helpers/mockData';
import mockFetch from './helpers/mockFetch';
import App from '../App';

describe('Teste para o componente WalletForm', () => {
  afterEach(() => { global.fetch.mockClear(); });

  beforeEach(() => jest.spyOn(global, 'fetch').mockImplementation(mockFetch));
  const email = 'alguem@test.com';
  const initialState = {
    user: {
      email,
    },
    wallet: {
      currencies: Object.values(mockData).map(({ code }) => code),
      expenses: [],
      editor: false,
      idToEdit: 0,
    },
  };
  const getButtonAndInputs = () => {
    const emailUser = screen.getByText(email);
    const valorInput = screen.getByTestId('value-input');
    const descricaoInput = screen.getByTestId('description-input');
    const moedaInput = screen.getByTestId('currency-input');
    const metodoInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');
    const buttonDespesas = screen.getByRole('button', { name: /despesas/i });
    return {
      emailUser,
      valorInput,
      descricaoInput,
      moedaInput,
      metodoInput,
      tagInput,
      buttonDespesas };
  };

  test('Testa a renderização dos inputs e botões na tela', () => {
    renderWithRouterAndRedux(<App />, { initialState, initialEntries: ['/carteira'] });

    const {
      emailUser,
      valorInput,
      descricaoInput,
      moedaInput,
      metodoInput,
      tagInput,
      buttonDespesas } = getButtonAndInputs();

    expect(emailUser).toBeInTheDocument();
    expect(valorInput).toBeInTheDocument();
    expect(descricaoInput).toBeInTheDocument();
    expect(moedaInput).toBeInTheDocument();
    expect(metodoInput).toBeInTheDocument();
    expect(tagInput).toBeInTheDocument();
    expect(buttonDespesas).toBeInTheDocument();
  });

  test('Testa os valores iniciais dos inputs', () => {
    renderWithRouterAndRedux(<App />, { initialState, initialEntries: ['/carteira'] });

    const {
      valorInput,
      descricaoInput,
      moedaInput,
      metodoInput,
      tagInput } = getButtonAndInputs();

    expect(valorInput).toHaveValue(null);
    expect(descricaoInput).toHaveValue('');
    expect(moedaInput).toHaveValue('USD');
    expect(metodoInput).toHaveValue('Dinheiro');
    expect(tagInput).toHaveValue('Alimentação');
  });
  test('Testa se os valores nos inputs alteram', () => {
    renderWithRouterAndRedux(<App />, { initialState, initialEntries: ['/carteira'] });

    const {
      valorInput,
      descricaoInput,
      moedaInput,
      metodoInput,
      tagInput } = getButtonAndInputs();

    userEvent.type(valorInput, '10');
    userEvent.type(descricaoInput, 'Teste');
    userEvent.selectOptions(moedaInput, 'CAD');
    userEvent.selectOptions(metodoInput, 'Dinheiro');
    userEvent.selectOptions(tagInput, 'Lazer');

    expect(valorInput).toHaveValue(10);
    expect(descricaoInput).toHaveValue('Teste');
    expect(moedaInput).toHaveValue('CAD');
    expect(metodoInput).toHaveValue('Dinheiro');
    expect(tagInput).toHaveValue('Lazer');
  });
  test('testa se a despesa é adicionada no estado global', async () => {
    renderWithRouterAndRedux(<App />, { initialState, initialEntries: ['/'] });

    const emailTest = 'alguem@test.com';
    const password = '123456789';

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/senha/i);
    const buttonEntrar = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(emailInput, emailTest);
    userEvent.type(passwordInput, password);
    userEvent.click(buttonEntrar);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    const {
      valorInput,
      descricaoInput,
      moedaInput,
      metodoInput,
      tagInput,
      buttonDespesas } = getButtonAndInputs();

    userEvent.type(valorInput, '10');
    userEvent.type(descricaoInput, 'Teste');
    userEvent.selectOptions(moedaInput, 'CAD');
    userEvent.selectOptions(metodoInput, 'Cartão de débito');
    userEvent.selectOptions(tagInput, 'Lazer');
    userEvent.click(buttonDespesas);

    await waitFor(() => {
      expect(valorInput).toHaveValue(null);
      expect(descricaoInput).toHaveValue('');
      expect(moedaInput).toHaveValue('USD');
      expect(metodoInput).toHaveValue('Dinheiro');
      expect(tagInput).toHaveValue('Alimentação');
    });
  });
  test('Testa o botão de deletar', async () => {
    const newStore = {
      user: {
        email,
      },
      wallet: {
        currencies: Object.values(mockData).map(({ code }) => code),
        expenses: [
          {
            id: 0,
            value: '10',
            currency: 'CAD',
            method: 'Cartão de crédito',
            tag: 'Lazer',
            description: 'teste',
            exchangeRates: mockData,
          },
        ],
        editor: false,
        idToEdit: 0,
      },
    };

    const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState: newStore });

    const buttonDelete = screen.getByTestId('delete-btn');
    expect(buttonDelete).toBeInTheDocument();
    userEvent.click(buttonDelete);

    await waitFor(() => {
      const { wallet } = store.getState();
      expect(wallet.expenses).toHaveLength(0);
      expect(screen.getByText(/0/i)).toBeInTheDocument();
    });
  });
  test('Testa se possui um botão de editar', async () => {
    const newStore = {
      user: {
        email,
      },
      wallet: {
        currencies: Object.values(mockData).map(({ code }) => code),
        expenses: [
          {
            id: 0,
            value: '10',
            currency: 'CAD',
            method: 'Cartão de crédito',
            tag: 'Lazer',
            description: 'teste',
            exchangeRates: mockData,
          },
        ],
        editor: false,
        idToEdit: 0,
      },
    };

    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState: newStore });

    const buttonEdit = screen.getByTestId('edit-btn');
    expect(buttonEdit).toBeInTheDocument();
  });
});
