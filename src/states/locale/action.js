const ActionType = {
  SET_TOGGLE_LOCALE: 'SET_TOGGLE_LOCALE',
};

function setToggleLocaleActionCreator(locale) {
  return {
    type: ActionType.SET_TOGGLE_LOCALE,
    payload: {
      locale,
    },
  };
}

function asyncToggleLocaleActionCreator() {
  return async (dispatch, getState) => {
    const newLocale = getState().locale === 'id' ? 'en' : 'id';
    localStorage.setItem('locale', newLocale);
    dispatch(setToggleLocaleActionCreator(newLocale));
  };
}

export {
  ActionType,
  setToggleLocaleActionCreator,
  asyncToggleLocaleActionCreator,
};
