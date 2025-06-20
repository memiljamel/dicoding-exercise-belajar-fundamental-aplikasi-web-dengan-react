import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { asyncSetDeleteContact, asyncSetGetContacts } from '../states/contacts/action';
import { homePage } from '../utils/content';
import ContactList from '../components/ContactList';
import SearchBar from '../components/SearchBar';

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState(() => searchParams.get('keyword') || '');

  const contacts = useSelector((states) => states.contacts);
  const locale = useSelector((states) => states.locale);

  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(asyncSetDeleteContact(id));
  };

  const handleKeywordChange = (value) => {
    setKeyword(value);
    setSearchParams({ keyword: value });
  };

  useEffect(() => {
    dispatch(asyncSetGetContacts());
  }, [dispatch]);

  const filteredContacts = contacts.filter((contact) => contact.name.toLowerCase().includes(
    keyword.toLowerCase(),
  ));

  return (
    <section>
      <SearchBar keywordChange={handleKeywordChange} keyword={keyword} />
      <h2>{homePage[locale].contactList}</h2>
      <ContactList onDelete={handleDelete} contacts={filteredContacts} />
    </section>
  );
}

export default HomePage;
