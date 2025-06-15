import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import { addPage } from '../utils/content';

function ContactInput({ addContact }) {
  const [name, handleNameChange] = useInput('');
  const [tag, handleTagChange] = useInput('');

  const locale = useSelector((states) => states.locale);

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
