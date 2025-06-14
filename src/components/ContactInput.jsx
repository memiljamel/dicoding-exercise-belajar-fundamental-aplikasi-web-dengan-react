import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput.js';
import LocaleContext from '../context/LocaleContext.js';
import { addPage } from '../utils/content.js';

function ContactInput({ addContact }) {
  const [name, handleNameChange] = useInput('');
  const [tag, handleTagChange] = useInput('');

  const { locale } = useContext(LocaleContext);

  function handleSubmit(event) {
    event.preventDefault();

    addContact({
      name: name,
      tag: tag,
    });
  }

  return (
    <form className="contact-input" onSubmit={handleSubmit}>
      <input type="text" placeholder={addPage[locale].name} value={name} onChange={handleNameChange} />
      <input type="text" placeholder={addPage[locale].tag} value={tag} onChange={handleTagChange} />
      <button type="submit">{addPage[locale].submit}</button>
    </form>
  );
}

ContactInput.propTypes = {
    addContact: PropTypes.func.isRequired,
}

export default ContactInput;
