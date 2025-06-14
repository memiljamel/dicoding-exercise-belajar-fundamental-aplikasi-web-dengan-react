import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import { addContact } from '../utils/api.js';
import LocaleContext from '../context/LocaleContext.js';
import ContactInput from '../components/ContactInput.jsx';
import { addPage } from '../utils/content.js';

function AddPage() {
  const navigate = useNavigate();

  const { locale } = useContext(LocaleContext);

  async function onAddContactHandler(contact) {
    await addContact(contact);
    navigate('/');
  }

  return (
    <section>
      <h2>{addPage[locale].instruction}</h2>
      <ContactInput addContact={onAddContactHandler}/>
    </section>
  );
}

export default AddPage;