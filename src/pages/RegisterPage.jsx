import React from 'react';
import { Link, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { asyncRegisterUser } from '../states/authUser/action';
import { registerPage } from '../utils/content';
import RegisterInput from '../components/RegisterInput';

function RegisterPage() {
  const locale = useSelector((states) => states.locale);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async ({ name, email, password }) => {
    dispatch(asyncRegisterUser({ name, email, password }));
    navigate('/');
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
