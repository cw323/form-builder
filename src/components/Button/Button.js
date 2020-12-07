import React from 'react';

import './Button.css';

const Button = ({ id, positionName, index, handleClick, label, icon }) => (
  <button className="Button" id={id} name={positionName} type="button" onClick={(e) => handleClick(e, index)}>
   {label && <div className="BulkButton">{label}</div>}
   {icon && <div className="IconWrapper">{icon}</div>}
  </button>
);

export default Button;
