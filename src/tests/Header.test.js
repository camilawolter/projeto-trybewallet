import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';

describe('Teste para o componente Header', () => {
  const email = 'alguem@test.com';
  const password = '123456789';

  test('Testa se o componente renderiza corretamente o email, total e a moeda', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/senha/i);
    const buttonEntrar = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, password);

    userEvent.click(buttonEntrar);

    const emailField = screen.getByTestId('email-field');
    const total = screen.getByTestId('total-field');
    const currency = screen.getByTestId('header-currency-field');

    expect(emailField).toHaveTextContent(email);
    expect(total).toHaveTextContent('0.00');
    expect(currency).toHaveTextContent('BRL');
  });
});
