import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  SET_ADD_CONTACT: 'SET_ADD_CONTACT',
  SET_GET_CONTACTS: 'SET_GET_CONTACTS',
  SET_DELETE_CONTACT: 'SET_DELETE_CONTACT',
};

function setAddContactActionCreator(contact) {
  return {
    type: ActionType.SET_ADD_CONTACT,
    payload: {
      contact,
    },
  };
}

function setGetContactsActionCreator(contacts) {
  return {
    type: ActionType.SET_GET_CONTACTS,
    payload: {
      contacts,
    },
  };
}

function setDeleteContactActionCreator(id) {
  return {
    type: ActionType.SET_DELETE_CONTACT,
    payload: {
      id,
    },
  };
}

function asyncSetAddContact({ name, tag }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const data = await api.addContact({ name, tag });
      dispatch(setAddContactActionCreator(data));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncSetGetContacts() {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const data = await api.getContacts();
      dispatch(setGetContactsActionCreator(data));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncSetDeleteContact(id) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      await api.deleteContact(id);
      dispatch(setDeleteContactActionCreator(id));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

export {
  ActionType,
  setAddContactActionCreator,
  setGetContactsActionCreator,
  setDeleteContactActionCreator,
  asyncSetAddContact,
  asyncSetGetContacts,
  asyncSetDeleteContact,
};
