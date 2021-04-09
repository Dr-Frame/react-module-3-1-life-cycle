import React, { Component } from 'react';
import './Filter.scss';

const Filter = ({ filter, changeFilter }) => {
  return (
    <label>
      Sort by name
      <input type="text" value={filter} onChange={changeFilter}></input>
    </label>
  );
};

export default Filter;
