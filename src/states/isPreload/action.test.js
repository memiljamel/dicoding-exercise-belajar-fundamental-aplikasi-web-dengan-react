import {
  afterEach, beforeEach, describe, expect, it, vi,
} from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { asyncPreloadProcess, setIsPreloadActionCreator } from './action';
import { setAuthUserActionCreator } from '../authUser/action';

const fakeAuthUserResponse = {
  id: 1,
  name: 'Name',
  email: 'email@domain.com',
};

const fakeErrorResponse = new Error('Ups, something went wrong.');

describe('asyncIsPreloadProcess thunk', () => {
  beforeEach(() => {
    api._getUserLogged = api.getUserLogged;
  });

  afterEach(() => {
    api._getUserLogged = api.getUserLogged;

    delete api._getUserLogged;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // Arrange
    api.getUserLogged = () => Promise.resolve(fakeAuthUserResponse);

    const dispatch = vi.fn();

    // Act
    await asyncPreloadProcess()(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeAuthUserResponse));
    expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // Arrange
    api.getUserLogged = () => Promise.reject(fakeErrorResponse);

    const dispatch = vi.fn();

    window.alert = vi.fn();

    // Act
    await asyncPreloadProcess()(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(null));
    expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
