import React from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { asyncSetAddContact } from '../states/contacts/action';
import { addPage } from '../utils/content';
import ContactInput from '../components/ContactInput';

function AddPage() {
  const locale = useSelector((states) => states.locale);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onAddContactHandler = async ({ name, tag }) => {
    dispatch(asyncSetAddContact({ name, tag }));
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
