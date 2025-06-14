import React, { useEffect, useMemo, useState } from 'react';
import { Route, Routes } from 'react-router';
import { getUserLogged, putAccessToken } from '../utils/api.js';
import LocaleContext from '../context/LocaleContext.js';
import { homePage } from '../utils/content.js';
import Navigation from './Navigation.jsx';
import HomePage from '../pages/HomePage.jsx';
import AddPage from '../pages/AddPage.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import RegisterPage from '../pages/RegisterPage.jsx';

function ContactApp() {
  const [authedUser, setAuthedUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  const [locale, setLocale] = useState(() => {
    return localStorage.getItem('locale') || 'id';
  });

  const toggleLocale = () => {
    setLocale((prevState) => {
      const newLocale = prevState === 'id' ? 'en' : 'id';
      localStorage.setItem('locale', newLocale);
      return newLocale;
    });
  }

  const localeContextValue = useMemo(() => {
    return {
      locale,
      toggleLocale,
    }
  }, [locale]);

  async function handleLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    setAuthedUser(data);
  }

  async function handleLogout() {
    setAuthedUser(null);
    putAccessToken('');
  }

  useEffect(() => {
    getUserLogged().then(({ data }) => {
      setAuthedUser(data);
      setInitializing(false);
    });

    return () => {
      setInitializing(true);
    }
  }, []);

  if (initializing) {
    return null;
  }

  if (authedUser === null) {
    return (
      <LocaleContext.Provider value={localeContextValue}>
        <div className="contact-app">
          <header className="contact-app__header">
            <h1>{homePage[locale].appName}</h1>
          </header>
          <main>
            <Routes>
              <Route path="/*" element={<LoginPage loginSuccess={handleLoginSuccess} />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </main>
        </div>
      </LocaleContext.Provider>
    );
  }

  return (
    <LocaleContext.Provider value={localeContextValue}>
      <div className="contact-app">
        <header className="contact-app__header">
          <h1>{homePage[locale].appName}</h1>
          <Navigation logout={handleLogout} name={authedUser.name} />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add" element={<AddPage />} />
          </Routes>
        </main>
      </div>
    </LocaleContext.Provider>
  );
}

export default ContactApp;