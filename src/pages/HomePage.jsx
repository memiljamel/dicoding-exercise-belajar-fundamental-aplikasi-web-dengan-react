import React, { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { deleteContact, getContacts } from '../utils/api.js';
import LocaleContext from '../context/LocaleContext.js';
import { homePage } from '../utils/content.js';
import ContactList from '../components/ContactList.jsx';
import SearchBar from '../components/SearchBar.jsx';

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [contacts, setContacts] = useState([]);
  const [keyword, setKeyword] = useState(() => {
    return searchParams.get('keyword') || '';
  });

  const { locale } = useContext(LocaleContext);

  async function handleDelete(id) {
    await deleteContact(id);
    const { data } = await getContacts();
    setContacts(data);
  }

  function handleKeywordChange(keyword) {
    setKeyword(keyword);
    setSearchParams({ keyword });
  }

  useEffect(() => {
    getContacts().then(({ data }) => {
      setContacts(data);
    });
  }, []);

  const filteredContacts = contacts.filter(contact => {
    return contact.name.toLowerCase().includes(
      keyword.toLowerCase(),
    );
  });

  return (
    <section>
      <SearchBar keywordChange={handleKeywordChange} keyword={keyword} />
      <h2>{homePage[locale].contactList}</h2>
      <ContactList onDelete={handleDelete} contacts={filteredContacts} />
    </section>
  )
}

export default HomePage;