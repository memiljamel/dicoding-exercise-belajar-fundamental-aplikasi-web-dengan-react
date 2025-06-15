import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { homePage } from '../utils/content';

function SearchBar({ keyword, keywordChange }) {
  const locale = useSelector((states) => states.locale);

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
