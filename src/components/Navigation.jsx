import React, { useContext } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { FiHome, FiLogOut, FiPlusCircle } from 'react-icons/fi';
import LocaleContext from '../context/LocaleContext';

function Navigation({ logout, name }) {
  const { locale, toggleLocale } = useContext(LocaleContext);

  return (
    <nav className="navigation">
      <ul>
        <li><button type="button" onClick={toggleLocale}>{locale === 'id' ? 'en' : 'id'}</button></li>
        <li><Link to="/"><FiHome /></Link></li>
        <li><Link to="/add"><FiPlusCircle /></Link></li>
        <li>
          <button type="button" onClick={logout}>
            {name}
            {' '}
            <FiLogOut />
          </button>
        </li>
      </ul>
    </nav>
  );
}

Navigation.propTypes = {
  logout: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default Navigation;
