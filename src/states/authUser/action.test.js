import {
  afterEach, beforeEach, describe, expect, it, vi,
} from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import {
  asyncRegisterUser,
  asyncSetAuthUser,
  asyncUnsetAuthUser,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
} from './action';

const fakeAccessTokenResponse = 'access-token';

const fakeAuthUserResponse = {
  id: 1,
  name: 'Name',
  email: 'email@domain.com',
};

const fakeErrorResponse = new Error('Ups, something went wrong.');

describe('asyncSetAuthUser thunk', () => {
  beforeEach(() => {
    api._login = api.login;
    api._getUserLogged = api.getUserLogged;
  });

  afterEach(() => {
    api._login = api.login;
    api._getUserLogged = api.getUserLogged;

    delete api._login;
    delete api._getUserLogged;
  });

  it('should store accessToken in localStorage when user login', async () => {
    // Arrange
    const email = 'email@domain.com';
    const password = 'password';

    api.login = () => Promise.resolve(fakeAccessTokenResponse);
    api.getUserLogged = () => Promise.resolve(fakeAuthUserResponse);

    const dispatch = vi.fn();

    // Act
    await asyncSetAuthUser({ email, password })(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(localStorage.getItem('accessToken')).toBe(fakeAccessTokenResponse);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // Arrange
    const email = 'email@domain.com';
    const password = 'password';

    api.login = () => Promise.resolve(fakeAccessTokenResponse);
    api.getUserLogged = () => Promise.resolve(fakeAuthUserResponse);

    const dispatch = vi.fn();

    // Act
    await asyncSetAuthUser({ email, password })(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeAuthUserResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // Arrange
    const email = 'email@domain.com';
    const password = 'password';

    api.login = () => Promise.reject(fakeErrorResponse);
    api.getUserLogged = () => Promise.reject(fakeErrorResponse);

    const dispatch = vi.fn();

    window.alert = vi.fn();

    // Act
    await asyncSetAuthUser({ email, password })(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});

describe('asyncUnsetAuthUser thunk', () => {
  it('accessToken in localStorage should be null when user logout', () => {
    // Arrange
    const dispatch = vi.fn();

    // Act
    asyncUnsetAuthUser()(dispatch);

    // Assert
    expect(localStorage.getItem('accessToken')).toBe('');
  });

  it('should dispatch action correctly when user logout', () => {
    // Arrange
    const dispatch = vi.fn();

    // Act
    asyncUnsetAuthUser()(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(unsetAuthUserActionCreator());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});

describe('asyncRegisterUser thunk', () => {
  beforeEach(() => {
    api._register = api.register;
  });

  afterEach(() => {
    api._register = api.register;

    delete api._register;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // Arrange
    const name = 'Name';
    const email = 'email@domain.com';
    const password = 'password';

    api.register = () => Promise.resolve();

    const dispatch = vi.fn();

    // Act
    await asyncRegisterUser({ name, email, password })(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // Arrange
    const name = 'Name';
    const email = 'email@domain.com';
    const password = 'password';

    api.register = () => Promise.reject(fakeErrorResponse);

    const dispatch = vi.fn();

    window.alert = vi.fn();

    // Act
    await asyncRegisterUser({ name, email, password })(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
