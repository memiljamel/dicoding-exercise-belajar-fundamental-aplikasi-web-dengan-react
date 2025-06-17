import { describe, expect, it } from 'vitest';
import { contactsReducer } from './reducer';
import { ActionType } from './action';

describe('contactsReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // Arrange
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    // Act
    const nextState = contactsReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the new contact when given by SET_ADD_CONTACT action', () => {
    // Arrange
    const initialState = [
      { id: 1, name: 'Name 1', tag: 'Tag 1' },
    ];
    const action = {
      type: ActionType.SET_ADD_CONTACT,
      payload: {
        contact: { id: 2, name: 'Name 2', tag: 'Tag 2' },
      },
    };

    // Act
    const nextState = contactsReducer(initialState, action);

    // Assert
    expect(nextState).toEqual([...initialState, action.payload.contact]);
  });

  it('should return the contacts when given by SET_GET_CONTACTS action', () => {
    // Arrange
    const initialState = [];
    const action = {
      type: ActionType.SET_GET_CONTACTS,
      payload: {
        contacts: [
          { id: 1, name: 'Name 1', tag: 'Tag 1' },
          { id: 2, name: 'Name 2', tag: 'Tag 2' },
        ],
      },
    };

    // Act
    const nextState = contactsReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(action.payload.contacts);
  });

  it('should return the contact without the deleted one when given SET_DELETE_CONTACT action', () => {
    // Arrange
    const initialState = [
      { id: 1, name: 'Name 1', tag: 'Tag 1' },
      { id: 2, name: 'Name 2', tag: 'Tag 2' },
    ];
    const action = {
      type: ActionType.SET_DELETE_CONTACT,
      payload: {
        id: 1,
      },
    };

    // Act
    const nextState = contactsReducer(initialState, action);

    // Assert
    expect(nextState).toEqual([
      { id: 2, name: 'Name 2', tag: 'Tag 2' },
    ]);
  });
});
