import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import LocaleContext from '../context/LocaleContext';
import { addPage } from '../utils/content';

function ContactInput({ addContact }) {
  const [name, handleNameChange] = useInput('');
  const [tag, handleTagChange] = useInput('');

  const { locale } = useContext(LocaleContext);

  const handleSubmit = (event) => {
    event.preventDefault();

    addContact({
      name,
      tag,
    });
  };

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
};

export default ContactInput;
