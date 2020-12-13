import React from 'react';
import s from './InputBar.module.css';

const InputBar = ({ name, value, placeholder, index, handleInputChange }) => (
  <input className={s.inputBar} name={name} type="text" value={value} placeholder={placeholder} onChange={(e) => handleInputChange(e, index)} />
);

export default InputBar;