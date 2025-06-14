import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import LocaleContext from '../context/LocaleContext';
import { homePage } from '../utils/content';

function SearchBar({ keyword, keywordChange }) {
  const { locale } = useContext(LocaleContext);

  return (
    <input
      className="search-bar"
      type="text"
      placeholder={homePage[locale].search}
      value={keyword}
      onChange={(event) => keywordChange(event.target.value)}
    />
  );
}

SearchBar.propTypes = {
  keyword: PropTypes.string.isRequired,
  keywordChange: PropTypes.func.isRequired,
};

export default SearchBar;
