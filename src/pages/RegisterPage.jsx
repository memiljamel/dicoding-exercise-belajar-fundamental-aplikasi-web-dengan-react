import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import { register } from '../utils/api';
import { registerPage } from '../utils/content';
import LocaleContext from '../context/LocaleContext';
import RegisterInput from '../components/RegisterInput';

function RegisterPage() {
  const navigate = useNavigate();

  const { locale } = useContext(LocaleContext);

  const handleRegister = async (user) => {
    const { error } = await register(user);
    if (!error) {
      navigate('/');
    }
  };

  return (
    <section className="register-page">
      <h2>{registerPage[locale].instruction}</h2>
      <RegisterInput register={handleRegister} />
      <p>
        {registerPage[locale].ask}
        {' '}
        <Link to="/">{registerPage[locale].answer}</Link>
      </p>
    </section>
  );
}

export default RegisterPage;
