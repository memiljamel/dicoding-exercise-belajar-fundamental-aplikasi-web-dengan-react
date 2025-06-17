import React from 'react';
import { Link } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { FiHome, FiLogOut, FiPlusCircle } from 'react-icons/fi';
import { asyncToggleLocale } from '../states/locale/action';

function Navigation({ logout, name }) {
  const locale = useSelector((states) => states.locale);

  const dispatch = useDispatch();

  const handleToggleLocale = () => {
    dispatch(asyncToggleLocale());
  };

  return (
    <nav className="navigation">
      <ul>
        <li><button type="button" onClick={handleToggleLocale}>{locale === 'id' ? 'en' : 'id'}</button></li>
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
