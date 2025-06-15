import { ActionType } from './action';

const contactsReducer = (contacts = [], action = {}) => {
  switch (action.type) {
    case ActionType.SET_ADD_CONTACT:
      return [...contacts, action.payload.contact];
    case ActionType.SET_GET_CONTACTS:
      return action.payload.contacts;
    case ActionType.SET_DELETE_CONTACT:
      return contacts.filter((contact) => contact.id !== action.payload.id);
    default:
      return contacts;
  }
};

export { contactsReducer };
