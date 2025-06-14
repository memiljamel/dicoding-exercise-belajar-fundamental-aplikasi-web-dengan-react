import React, { useContext } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { login } from '../utils/api';
import { loginPage } from '../utils/content';
import LocaleContext from '../context/LocaleContext';
import LoginInput from '../components/LoginInput';

function LoginPage({ loginSuccess }) {
  const { locale } = useContext(LocaleContext);

  const handleLogin = async (user) => {
    const { error, data } = await login(user);

    if (!error) {
      loginSuccess(data);
    }
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

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;
