import {
  afterEach, beforeEach, describe, expect, it, vi,
} from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import {
  asyncSetAddContact,
  asyncSetDeleteContact,
  asyncSetGetContacts,
  setAddContactActionCreator,
  setDeleteContactActionCreator,
  setGetContactsActionCreator,
} from './action';

const fakeContactResponse = {
  id: 1,
  name: 'Name',
  tag: 'Tag',
};

const fakeErrorResponse = new Error('Ups, something went wrong.');

describe('asyncSetAddContact thunk', () => {
  beforeEach(() => {
    api._addContact = api.addContact;
  });

  afterEach(() => {
    api._addContact = api.addContact;

    delete api._addContact;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // Arrange
    const name = 'Name';
    const tag = 'Tag';

    api.addContact = () => Promise.resolve(fakeContactResponse);

    const dispatch = vi.fn();

    // Act
    await asyncSetAddContact({ name, tag })(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setAddContactActionCreator(fakeContactResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // Arrange
    const name = 'Name';
    const tag = 'Tag';

    api.addContact = () => Promise.reject(fakeErrorResponse);

    const dispatch = vi.fn();

    window.alert = vi.fn();

    // Act
    await asyncSetAddContact({ name, tag })(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});

describe('asyncSetGetContacts thunk', () => {
  beforeEach(() => {
    api._getContacts = api.getContacts;
  });

  afterEach(() => {
    api._getContacts = api.getContacts;

    delete api._getContacts;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // Arrange
    api.getContacts = () => Promise.resolve(fakeContactResponse);

    const dispatch = vi.fn();

    // Act
    await asyncSetGetContacts()(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setGetContactsActionCreator(fakeContactResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // Arrange
    api.getContacts = () => Promise.reject(fakeErrorResponse);

    const dispatch = vi.fn();

    window.alert = vi.fn();

    // Act
    await asyncSetGetContacts()(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});

describe('asyncSetDeleteContact thunk', () => {
  beforeEach(() => {
    api._deleteContact = api.deleteContact;
  });

  afterEach(() => {
    api._deleteContact = api.deleteContact;

    delete api._deleteContact;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // Arrange
    const id = 1;

    api.deleteContact = () => Promise.resolve();

    const dispatch = vi.fn();

    // Act
    await asyncSetDeleteContact(id)(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setDeleteContactActionCreator(id));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // Arrange
    const id = 1;

    api.deleteContact = () => Promise.reject(fakeErrorResponse);

    const dispatch = vi.fn();

    window.alert = vi.fn();

    // Act
    await asyncSetDeleteContact(id)(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
