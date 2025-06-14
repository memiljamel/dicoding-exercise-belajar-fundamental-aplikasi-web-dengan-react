import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import { addContact } from '../utils/api';
import { addPage } from '../utils/content';
import LocaleContext from '../context/LocaleContext';
import ContactInput from '../components/ContactInput';

function AddPage() {
  const navigate = useNavigate();

  const { locale } = useContext(LocaleContext);

  const onAddContactHandler = async (contact) => {
    await addContact(contact);
    navigate('/');
  };

  return (
    <section>
      <h2>{addPage[locale].instruction}</h2>
      <ContactInput addContact={onAddContactHandler} />
    </section>
  );
}

export default AddPage;
