import React from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import popTransition from './transitions/pop.module.css';
import ContactListItem from './ContactListItem';
import './ContactList.scss';

const ContactList = ({ filterContacts, onDeleteContacts }) => (
  <TransitionGroup component="ul" className="contacts">
    {filterContacts.map(({ id, name, number }) => (
      <CSSTransition key={id} timeout={250} classNames={popTransition}>
        <li key={id} className="contacts__item">
          <ContactListItem
            name={name}
            number={number}
            onDelete={() => onDeleteContacts(id)}
          />
        </li>
      </CSSTransition>
    ))}
  </TransitionGroup>
);

ContactList.propsTypes = {
  filterContacts: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDeleteContacts: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};

export default ContactList;
