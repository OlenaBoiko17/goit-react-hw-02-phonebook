import React, { Component } from "react";

import Filter from "./Filter/Filter";
import ContactList from "./ContactList/ContactList";
import Form from "./Form/Form";
import FormikForm from "./FormikForm/FormikForm";
import { MainDiv } from "./app.styled";


export class App extends Component  {
  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: '',
  };



  addContact = (person) => {
    const { contacts } = this.state;
    const personNormalize = person.name.toLowerCase();
    const contactsMap = contacts.find(cont => cont.name.toLowerCase() === personNormalize);

    if (contactsMap) return alert("Pleace don't do it!");
    this.setState(prevState => ({contacts: [person,...prevState.contacts]}));
  };

  filterName = (e) => {
    this.setState({ filter: e.currentTarget.value });
  };

  deleteContact = (contId) => {
    const { contacts } = this.state;
    const filterContact = contacts.filter(cont => cont.id !== contId);
    
    this.setState(prevState=>({contacts: filterContact}));
  };


  render() {
    const { contacts, filter } = this.state;
    
    const normalizeFilter = filter.toLowerCase();
    const visiblePersons = contacts.filter(cont=>cont.name.toLowerCase().includes(normalizeFilter));

    return (
      <MainDiv>
        <h2>Phonebook</h2>
        <Form onSubmit={this.addContact} />
        <FormikForm onSubmit={this.addContact} />
      
        <h2>Contacts</h2>  
        <Filter onChange={this.filterName} value={this.state.filter} />
        <ContactList renderData={visiblePersons} onClick={this.deleteContact} />
      </MainDiv>
    );
  }
};
