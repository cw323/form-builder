import React from 'react';
import './InputBar.css';

const InputBar = ({ name, value, placeholder, index, handleInputChange }) => (
  <input className="InputBar" name={name} type="text" value={value} placeholder={placeholder} onChange={(e) => handleInputChange(e, index)} />
);

export default InputBar;