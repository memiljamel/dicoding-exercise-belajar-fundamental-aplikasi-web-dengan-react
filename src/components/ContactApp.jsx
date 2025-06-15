import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';
import { asyncUnsetAuthUser } from '../states/authUser/action';
import { asyncPreloadProcess } from '../states/isPreload/action';
import { homePage } from '../utils/content';
import Navigation from './Navigation';
import HomePage from '../pages/HomePage';
import AddPage from '../pages/AddPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

function ContactApp() {
  const authUser = useSelector((states) => states.authUser);
  const isPreload = useSelector((states) => states.isPreload);
  const locale = useSelector((states) => states.locale);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(asyncUnsetAuthUser());
    navigate('/');
  };

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  if (isPreload) {
    return null;
  }

  if (authUser === null) {
    return (
      <>
        <LoadingBar />

        <div className="contact-app">
          <header className="contact-app__header">
            <h1>{homePage[locale].appName}</h1>
          </header>
          <main>
            <Routes>
              <Route path="/*" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </main>
        </div>
      </>
    );
  }

  return (
    <>
      <LoadingBar />

      <div className="contact-app">
        <header className="contact-app__header">
          <h1>{homePage[locale].appName}</h1>
          <Navigation logout={handleLogout} name={authUser.name} />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add" element={<AddPage />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default ContactApp;
