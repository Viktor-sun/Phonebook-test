import React, { Component } from 'react';
import shortid from 'shortid';
import { CSSTransition } from 'react-transition-group';
import Container from './components/Container';
import ContactForm from './components/ContactForm';
import Filter from './components/Filter';
import ContactList from './components/ContactList';
import Alert from './components/Alert';
import Title from './components/Title';
import './App.scss';
import transitionTitle from './assets/styles/transition/title.module.css';
import transitionAlert from './assets/styles/transition/alert.module.css';
import transitionFilter from './assets/styles/transition/filter.module.css';

class App extends Component {
  state = {
    contacts: [],
    filter: '',

    goTitle: false,
    showAlert: false,
  };

  componentDidMount() {
    const contactsString = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(contactsString);

    if (parseContacts) {
      this.setState({ contacts: parseContacts });
    }

    this.setState({ goTitle: true });
  }

  componentDidUpdate(prevProps, prevState) {
    const nextContacts = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (nextContacts !== prevContacts) {
      localStorage.setItem('contacts', JSON.stringify(nextContacts));
    }
  }

  handleFormSubmit = data => {
    const { name, number } = data;
    const { contacts } = this.state;

    contacts.some(contact => contact.name === name)
      ? this.setState({ showAlert: true })
      : // alert(`${name} is already in contacts!`)
        this.setState({
          contacts: [
            ...contacts,
            { id: shortid.generate(), name: name, number: number },
          ],
        });
  };

  changeFilter = e => {
    this.setState({
      filter: e.currentTarget.value,
    });
  };

  getFilterContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLocaleLowerCase();

    return contacts.filter(
      ({ name, number }) =>
        name.toLocaleLowerCase().includes(normalizedFilter) ||
        number.includes(normalizedFilter),
    );
  };

  deleteContacts = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { filter, showAlert, goTitle } = this.state;
    const filterContacts = this.getFilterContacts();
    const shouldRenderFilter = filterContacts.length > 1 || Boolean(filter);

    return (
      <Container>
        <CSSTransition
          in={showAlert}
          timeout={3000}
          classNames={transitionAlert}
          onEntered={() => this.setState({ showAlert: false })}
          mountOnEnter
          unmountOnExit
        >
          <Alert />
        </CSSTransition>

        <CSSTransition
          in={goTitle}
          mountOnEnter
          timeout={500}
          classNames={transitionTitle}
        >
          <Title />
        </CSSTransition>

        <ContactForm onSubmit={this.handleFormSubmit} />

        <h2 className="contacts-title">Contacts</h2>
        <CSSTransition
          in={shouldRenderFilter}
          mountOnEnter
          unmountOnExit
          timeout={500}
          classNames={transitionFilter}
        >
          <Filter inputValue={filter} onChange={this.changeFilter} />
        </CSSTransition>

        <ContactList
          filterContacts={filterContacts}
          onDeleteContacts={this.deleteContacts}
        />
      </Container>
    );
  }
}

export default App;
