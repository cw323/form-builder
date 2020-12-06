import React from 'react';

const InputBar = ({ name, value, placeholder, index, handleInputChange }) => (
  <input name={name} type="text" value={value} placeholder={placeholder} onChange={(e) => handleInputChange(e, index)} />
);

export default InputBar;