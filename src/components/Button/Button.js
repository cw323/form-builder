import React from 'react';

const Button = ({ id, positionName, index, handleClick, label }) => (
  <button id={id} name={positionName} type="button" onClick={(e) => handleClick(e, index)}>
    {label}
  </button>
);

export default Button;