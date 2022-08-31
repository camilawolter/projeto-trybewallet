import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';

describe('Testes na página de Login', () => {
  const email = 'alguem@test.com';
  const password = '123456789';

  test('Testa a renderazição dos inputs de email, senha e o botão', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/senha/i);
    const buttonEntrar = screen.getByRole('button', { name: /entrar/i });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(buttonEntrar).toBeInTheDocument();
    expect(buttonEntrar).toBeDisabled();

    expect(emailInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
  });
  test('Testa se o botão esta desabilitado de entrar', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });

    const emailFail = 'test.com';
    const passwordFail = '1234';

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/senha/i);
    const buttonEntrar = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(emailInput, emailFail);
    userEvent.type(passwordInput, passwordFail);

    expect(buttonEntrar).toBeDisabled();
  });
  test('Testa o redirecionamento da página', () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/senha/i);
    const buttonEntrar = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, password);

    expect(emailInput).toHaveValue(email);
    expect(passwordInput).toHaveValue(password);
    expect(buttonEntrar).not.toBeDisabled();

    userEvent.click(buttonEntrar);

    expect(history.location.pathname).toBe('/carteira');
  });
});
