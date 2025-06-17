import { describe, expect, it } from 'vitest';
import { authUserReducer } from './reducer';
import { ActionType } from './action';

describe('authUserReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // Arrange
    const initialState = null;
    const action = { type: 'UNKNOWN' };

    // Act
    const nextState = authUserReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the authUser when given by SET_AUTH_USER action', () => {
    // Arrange
    const initialState = null;
    const action = {
      type: ActionType.SET_AUTH_USER,
      payload: {
        authUser: {
          id: 1,
          name: 'Name',
          email: 'email@domain.com',
        },
      },
    };

    // Act
    const nextState = authUserReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(action.payload.authUser);
  });

  it('should return null value when given UNSET_AUTH_USER action', () => {
    // Arrange
    const initialState = {
      id: 1,
      name: 'Name',
      email: 'email@domain.com',
    };
    const action = {
      type: ActionType.UNSET_AUTH_USER,
    };

    // Act
    const nextState = authUserReducer(initialState, action);

    // Assert
    expect(nextState).toBeNull();
  });
});
