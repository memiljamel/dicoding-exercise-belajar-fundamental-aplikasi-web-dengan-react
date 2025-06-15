import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import ContactApp from './components/ContactApp';
import store from './states/index';

// styling
import './styles/style.css';

const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ContactApp />
    </BrowserRouter>
  </Provider>,
);
