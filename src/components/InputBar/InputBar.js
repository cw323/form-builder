import React from 'react';

const InputBar = ({ name, value, placeholder, index, handleInputChange }) => (
  <input name={name} type="text" value={value} placeholder={placeholder} onChange={(e) => handleInputChange(index, e)} />
);

export default InputBar;