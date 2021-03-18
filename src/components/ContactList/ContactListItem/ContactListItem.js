import React from 'react';

const ContactListItem = ({ name, number, onDelete }) => (
  <>
    <span>
      {name}: {number}
    </span>

    <button className="contacts__button" type="button" onClick={onDelete}>
      Delete
    </button>
  </>
);

export default ContactListItem;
