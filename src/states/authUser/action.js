import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  SET_AUTH_USER: 'SET_AUTH_USER',
  UNSET_AUTH_USER: 'UNSET_AUTH_USER',
};

function setAuthUserActionCreator(authUser) {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      authUser,
    },
  };
}

function unsetAuthUserActionCreator() {
  return {
    type: ActionType.UNSET_AUTH_USER,
    payload: null,
  };
}

function asyncSetAuthUser({ email, password }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const accessToken = await api.login({ email, password });
      api.putAccessToken(accessToken);

      const data = await api.getUserLogged();
      dispatch(setAuthUserActionCreator(data));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncUnsetAuthUser() {
  return (dispatch) => {
    dispatch(showLoading());

    dispatch(unsetAuthUserActionCreator());
    api.putAccessToken('');

    dispatch(hideLoading());
  };
}

function asyncRegisterUser({ name, email, password }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      await api.register({ name, email, password });
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

export {
  ActionType,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  asyncSetAuthUser,
  asyncUnsetAuthUser,
  asyncRegisterUser,
};
