import React, { useEffect, useMemo, useState } from 'react';
import { Route, Routes } from 'react-router';
import { getUserLogged, putAccessToken } from '../utils/api';
import LocaleContext from '../context/LocaleContext';
import { homePage } from '../utils/content';
import Navigation from './Navigation';
import HomePage from '../pages/HomePage';
import AddPage from '../pages/AddPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

function ContactApp() {
  const [authedUser, setAuthedUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  const [locale, setLocale] = useState(() => localStorage.getItem('locale') || 'id');

  const toggleLocale = () => {
    setLocale((prevState) => {
      const newLocale = prevState === 'id' ? 'en' : 'id';
      localStorage.setItem('locale', newLocale);
      return newLocale;
    });
  };

  const localeContextValue = useMemo(() => ({
    locale,
    toggleLocale,
  }), [locale]);

  const handleLoginSuccess = async ({ accessToken }) => {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    setAuthedUser(data);
  };

  const handleLogout = () => {
    setAuthedUser(null);
    putAccessToken('');
  };

  useEffect(() => {
    getUserLogged().then(({ data }) => {
      setAuthedUser(data);
      setInitializing(false);
    });

    return () => {
      setInitializing(true);
    };
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
