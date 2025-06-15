import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import { registerPage } from '../utils/content';

function RegisterInput({ register }) {
  const [name, handleNameChange] = useInput('');
  const [email, handleEmailChange] = useInput('');
  const [password, handlePasswordChange] = useInput('');

  const locale = useSelector((states) => states.locale);

  const handleSubmit = (event) => {
    event.preventDefault();

    register({
      name,
      email,
      password,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="register-input">
      <input type="text" placeholder={registerPage[locale].name} value={name} onChange={handleNameChange} />
      <input type="email" placeholder={registerPage[locale].email} value={email} onChange={handleEmailChange} />
      <input type="password" placeholder={registerPage[locale].password} autoComplete="current-password" value={password} onChange={handlePasswordChange} />
      <button type="submit">{registerPage[locale].submit}</button>
    </form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
