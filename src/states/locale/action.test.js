import {
  describe, expect, it, vi,
} from 'vitest';
import { asyncToggleLocale, setToggleLocaleActionCreator } from './action';

describe('asyncToggleLocale thunk', () => {
  it('should toggle locale from "en" to "id"', () => {
    // Arrange
    const dispatch = vi.fn();
    const getState = vi.fn(() => ({ locale: 'en' }));

    // Act
    asyncToggleLocale()(dispatch, getState);

    // Assert
    expect(localStorage.getItem('locale')).toBe('id');
    expect(dispatch).toHaveBeenCalledWith(setToggleLocaleActionCreator('id'));
  });

  it('should toggle locale from "id" to "en"', () => {
    // Arrange
    const dispatch = vi.fn();
    const getState = vi.fn(() => ({ locale: 'id' }));

    // Act
    asyncToggleLocale()(dispatch, getState);

    // Assert
    expect(localStorage.getItem('locale')).toBe('en');
    expect(dispatch).toHaveBeenCalledWith(setToggleLocaleActionCreator('en'));
  });
});
