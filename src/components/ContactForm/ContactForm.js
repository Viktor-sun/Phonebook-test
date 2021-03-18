import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ContactForm.scss';

class ContactForm extends Component {
  state = { name: '', number: '' };

  handleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state);
    this.reset();
  };

  reset = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    const { name, number } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className="form">
        <label className="form__field">
          <span className="form__label">Name</span>
          <input
            className="form__input"
            type="text"
            name="name"
            onChange={this.handleChange}
            value={name}
            placeholder="Vasya Pupkin"
            required
          />
        </label>
        <label className="form__field">
          <span className="form__label">Number</span>
          <input
            className="form__input"
            type="tel"
            name="number"
            onChange={this.handleChange}
            value={number}
            placeholder="+380112223344"
            pattern="[+0-9]{10,13}"
            required
          />
          <span className="form__error">
            This field should contain a phone number in the format +380112223344
          </span>
        </label>
        <button className="form__button" type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

ContactForm.propsTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
