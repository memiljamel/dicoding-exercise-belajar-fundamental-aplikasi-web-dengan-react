import { useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import { register } from '../utils/api.js';
import LocaleContext from '../context/LocaleContext.js';
import { registerPage } from '../utils/content.js';
import RegisterInput from '../components/RegisterInput.jsx';

function RegisterPage() {
  const navigate = useNavigate();

  const { locale } = useContext(LocaleContext);

  async function handleRegister(user) {
    const { error } = await register(user);
    if (!error) {
      navigate('/');
    }
  }

  return (
    <section className="register-page">
      <h2>{registerPage[locale].instruction}</h2>
      <RegisterInput register={handleRegister} />
      <p>{registerPage[locale].ask} <Link to="/">{registerPage[locale].answer}</Link></p>
    </section>
  )
}

export default RegisterPage;