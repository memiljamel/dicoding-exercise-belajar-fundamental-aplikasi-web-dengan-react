import { useContext } from 'react';
import PropTypes from 'prop-types';
import LocaleContext from '../context/LocaleContext.js';
import { homePage } from '../utils/content.js';

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
  )
}

SearchBar.propTypes = {
  keyword: PropTypes.string.isRequired,
  keywordChange: PropTypes.func.isRequired,
};

export default SearchBar;