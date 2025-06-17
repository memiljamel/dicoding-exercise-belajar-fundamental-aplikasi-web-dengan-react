import React from 'react';
import {
  afterEach, describe, expect, it, vi,
} from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
import { cleanup, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import LoginInput from './LoginInput';
import store from '../states/index';

expect.extend(matchers);

describe('LoginInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle email typing correctly', async () => {
    // Arrange
    render(
      <Provider store={store}>
        <LoginInput login={() => {}} />
      </Provider>,
    );

    const emailInput = await screen.getByPlaceholderText('Email');

    // Act
    await userEvent.type(emailInput, 'email@domain.com');

    // Assert
    expect(emailInput).toHaveValue('email@domain.com');
  });

  it('should handle password typing correctly', async () => {
    // Arrange
    render(
      <Provider store={store}>
        <LoginInput login={() => {}} />
      </Provider>,
    );

    const passwordInput = await screen.getByPlaceholderText('Password');

    // Act
    await userEvent.type(passwordInput, 'Password');

    // Assert
    expect(passwordInput).toHaveValue('Password');
  });

  it('should call login function when login button is clicked', async () => {
    // Arrange
    const mockLogin = vi.fn();

    render(
      <Provider store={store}>
        <LoginInput login={mockLogin} />
      </Provider>,
    );

    const emailInput = await screen.getByPlaceholderText('Email');
    await userEvent.type(emailInput, 'email@domain.com');

    const passwordInput = await screen.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, 'Password');

    const loginButton = await screen.getByRole('button', { name: 'Login' });

    // Act
    await userEvent.click(loginButton);

    // Assert
    expect(mockLogin).toBeCalledWith({
      email: 'email@domain.com',
      password: 'Password',
    });
  });
});
