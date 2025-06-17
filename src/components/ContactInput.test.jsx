import React from 'react';
import {
  afterEach, describe, expect, it, vi,
} from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
import { cleanup, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import ContactInput from './ContactInput';
import store from '../states/index';

expect.extend(matchers);

describe('ContactInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle name typing correctly', async () => {
    // Arrange
    render(
      <Provider store={store}>
        <ContactInput addContact={() => {}} />
      </Provider>,
    );
    const nameInput = await screen.getByPlaceholderText('Name');

    // Act
    await userEvent.type(nameInput, 'Name');

    // Assert
    expect(nameInput).toHaveValue('Name');
  });

  it('should handle tag typing correctly', async () => {
    // Arrange
    render(
      <Provider store={store}>
        <ContactInput addContact={() => {}} />
      </Provider>,
    );
    const tagInput = await screen.getByPlaceholderText('Tag');

    // Act
    await userEvent.type(tagInput, 'Tag');

    // Assert
    expect(tagInput).toHaveValue('Tag');
  });

  it('should call addContact function when add button is clicked', async () => {
    // Arrange
    const mockAddContact = vi.fn();

    render(
      <Provider store={store}>
        <ContactInput addContact={mockAddContact} />
      </Provider>,
    );

    const nameInput = await screen.getByPlaceholderText('Name');
    await userEvent.type(nameInput, 'Name');

    const tagInput = await screen.getByPlaceholderText('Tag');
    await userEvent.type(tagInput, 'Tag');

    const addButton = await screen.getByRole('button', { name: 'Add' });

    // Act
    await userEvent.click(addButton);

    // Assert
    expect(mockAddContact).toBeCalledWith({
      name: 'Name',
      tag: 'Tag',
    });
  });
});
