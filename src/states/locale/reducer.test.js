import { describe, expect, it } from 'vitest';
import { localeReducer } from './reducer';
import { ActionType } from './action';

describe('localeReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // Arrange
    const initialState = localStorage.getItem('locale') || 'en';
    const action = { type: 'UNKNOWN' };

    // Act
    const nextState = localeReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the locale when given by SET_TOGGLE_LOCALE action', () => {
    // Arrange
    const initialState = localStorage.getItem('locale') || 'en';
    const action = {
      type: ActionType.SET_TOGGLE_LOCALE,
      payload: {
        locale: 'id',
      },
    };

    // Act
    const nextState = localeReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(action.payload.locale);
  });
});
