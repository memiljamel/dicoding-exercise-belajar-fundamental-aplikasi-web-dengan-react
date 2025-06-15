import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
import { authUserReducer } from './authUser/reducer';
import { isPreloadReducer } from './isPreload/reducer';
import { contactsReducer } from './contacts/reducer';
import { localeReducer } from './locale/reducer';

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    contacts: contactsReducer,
    locale: localeReducer,
    loadingBar: loadingBarReducer,
  },
});

export default store;
