import React from 'react';
import PropTypes from 'prop-types';
import './Filter.scss';

const Filter = ({ inputValue, onChange }) => (
  <label className="filter__field">
    <span className="filter__label">Find contacts by name</span>
    <input
      className="filter__input"
      type="text"
      name="filter"
      onChange={onChange}
      value={inputValue}
      placeholder="Enter name or number"
    />
  </label>
);

Filter.propsTypes = {
  inputValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
