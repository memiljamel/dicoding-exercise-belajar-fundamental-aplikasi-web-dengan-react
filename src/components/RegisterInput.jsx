import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput.js';
import LocaleContext from '../context/LocaleContext.js';
import { registerPage } from '../utils/content.js';

function RegisterInput({ register }) {
  const [name, handleNameChange] = useInput('');
  const [email, handleEmailChange] = useInput('');
  const [password, handlePasswordChange] = useInput('');

  const { locale } = useContext(LocaleContext);

  function handleSubmit(event) {
    event.preventDefault();

    register({
      name: name,
      email: email,
      password: password,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="register-input">
      <input type="text" placeholder={registerPage[locale].name} value={name} onChange={handleNameChange} />
      <input type="email" placeholder={registerPage[locale].email} value={email} onChange={handleEmailChange} />
      <input type="password" placeholder={registerPage[locale].password} autoComplete="current-password" value={password} onChange={handlePasswordChange} />
      <button>{registerPage[locale].submit}</button>
    </form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;