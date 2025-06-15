import { ActionType } from './action';

function localeReducer(locale = localStorage.getItem('locale') || 'en', action = {}) {
  switch (action.type) {
    case ActionType.SET_TOGGLE_LOCALE:
      return action.payload.locale;
    default:
      return locale;
  }
}

export { localeReducer };
