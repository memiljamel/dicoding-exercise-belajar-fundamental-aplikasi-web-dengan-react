import React from 'react';
import { Link, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { loginPage } from '../utils/content';
import { asyncSetAuthUser } from '../states/authUser/action';
import LoginInput from '../components/LoginInput';

function LoginPage() {
  const locale = useSelector((states) => states.locale);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async ({ email, password }) => {
    await dispatch(asyncSetAuthUser({ email, password }));
    navigate('/');
  };

  return (
    <section className="login-page">
      <h2>{loginPage[locale].instruction}</h2>
      <LoginInput login={handleLogin} />
      <p>
        {loginPage[locale].ask}
        {' '}
        <Link to="/register">{loginPage[locale].answer}</Link>
      </p>
    </section>
  );
}

export default LoginPage;
