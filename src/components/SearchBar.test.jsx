import React from 'react';
import {
  afterEach, describe, expect, it, vi,
} from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
import { cleanup, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import SearchBar from './SearchBar';
import store from '../states/index';

expect.extend(matchers);

describe('SearchBar component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle search typing correctly', async () => {
    // Arrange
    const searchMock = vi.fn();

    render(
      <Provider store={store}>
        <SearchBar keywordChange={searchMock} keyword="" />
      </Provider>,
    );

    const searchInput = await screen.getByPlaceholderText('Search by name');

    // Act
    await userEvent.type(searchInput, 'Name');

    // Assert
    expect(searchMock).toHaveBeenNthCalledWith(1, 'N');
    expect(searchMock).toHaveBeenNthCalledWith(2, 'a');
    expect(searchMock).toHaveBeenNthCalledWith(3, 'm');
    expect(searchMock).toHaveBeenNthCalledWith(4, 'e');
  });
});
