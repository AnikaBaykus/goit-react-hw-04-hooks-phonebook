import './App.css';
import { v4 as uuidv4 } from 'uuid';
import Section from './Section';
import { useState, useEffect } from 'react';
import Container from './Container';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import Notification from './Notification';

export default function App() {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    if (contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  });

  const submitFormHandler = (name, number) => {
    const idContact = uuidv4();

    const contact = {
      name: name,
      number: number,
      id: idContact,
    };

    const findCopyContact = contacts
      .map(contact => contact.name.toLowerCase())
      .includes(name.toLowerCase());

    if (findCopyContact) {
      alert(`${name} is already in contacts.`);
    } else {
      setContacts([contact, ...contacts]);
    }
  };

  const filterChange = event => {
    setFilter(event.currentTarget.value);
  };

  const normalizedFilter = filter.toLowerCase();

  const visibleContact = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter),
  );

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  return (
    <Container>
      <Section title="Phonebook">
        <ContactForm onSubmit={submitFormHandler} />
      </Section>
      <Section title="Contacts">
        <Filter value={filter} onChange={filterChange}></Filter>
        {contacts.length > 0 ? (
          <ContactList
            contacts={visibleContact}
            onDeleteContact={deleteContact}
          ></ContactList>
        ) : (
          <Notification message="No contacts"></Notification>
        )}
      </Section>
    </Container>
  );
}
