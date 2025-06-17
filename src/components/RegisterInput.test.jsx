import React from 'react';
import {
  afterEach, describe, expect, it, vi,
} from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
import { cleanup, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import RegisterInput from './RegisterInput';
import store from '../states/index';

expect.extend(matchers);

describe('RegisterInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle name typing correctly', async () => {
    // Arrange
    render(
      <Provider store={store}>
        <RegisterInput register={() => {}} />
      </Provider>,
    );
    const nameInput = await screen.getByPlaceholderText('Name');

    // Act
    await userEvent.type(nameInput, 'Name');

    // Assert
    expect(nameInput).toHaveValue('Name');
  });

  it('should handle email typing correctly', async () => {
    // Arrange
    render(
      <Provider store={store}>
        <RegisterInput register={() => {}} />
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
        <RegisterInput register={() => {}} />
      </Provider>,
    );

    const passwordInput = await screen.getByPlaceholderText('Password');

    // Act
    await userEvent.type(passwordInput, 'Password');

    // Assert
    expect(passwordInput).toHaveValue('Password');
  });

  it('should call register function when register button is clicked', async () => {
    // Arrange
    const mockRegister = vi.fn();

    render(
      <Provider store={store}>
        <RegisterInput register={mockRegister} />
      </Provider>,
    );

    const nameInput = await screen.getByPlaceholderText('Name');
    await userEvent.type(nameInput, 'Name');

    const emailInput = await screen.getByPlaceholderText('Email');
    await userEvent.type(emailInput, 'email@domain.com');

    const passwordInput = await screen.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, 'Password');

    const registerButton = await screen.getByRole('button', { name: 'Register' });

    // Act
    await userEvent.click(registerButton);

    // Assert
    expect(mockRegister).toBeCalledWith({
      name: 'Name',
      email: 'email@domain.com',
      password: 'Password',
    });
  });
});
