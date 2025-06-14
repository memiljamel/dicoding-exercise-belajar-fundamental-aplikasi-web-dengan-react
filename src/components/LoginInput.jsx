import { useContext } from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput.js';
import LocaleContext from '../context/LocaleContext.js';
import { loginPage } from '../utils/content.js';

function LoginInput({ login }) {
  const [email, handleEmailChange] = useInput('');
  const [password, handlePasswordChange] = useInput('');

  const { locale } = useContext(LocaleContext);

  function handleSubmit(event) {
    event.preventDefault();

    login({
      email: email,
      password: password,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="login-input">
      <input type="email" placeholder={loginPage[locale].email} value={email} onChange={handleEmailChange} />
      <input type="password" placeholder={loginPage[locale].password} autoComplete="current-password" value={password} onChange={handlePasswordChange} />
      <button>{loginPage[locale].submit}</button>
    </form>
  )
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;