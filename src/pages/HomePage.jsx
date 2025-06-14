import React, { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { deleteContact, getContacts } from '../utils/api';
import { homePage } from '../utils/content';
import LocaleContext from '../context/LocaleContext';
import ContactList from '../components/ContactList';
import SearchBar from '../components/SearchBar';

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [contacts, setContacts] = useState([]);
  const [keyword, setKeyword] = useState(() => searchParams.get('keyword') || '');

  const { locale } = useContext(LocaleContext);

  const handleDelete = async (id) => {
    await deleteContact(id);
    const { data } = await getContacts();
    setContacts(data);
  };

  const handleKeywordChange = (value) => {
    setKeyword(value);
    setSearchParams({ keyword: value });
  };

  useEffect(() => {
    getContacts().then(({ data }) => {
      setContacts(data);
    });
  }, []);

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
