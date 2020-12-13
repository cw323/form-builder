import React from 'react';

import s from './Button.module.css';

const Button = ({ className, id, positionName, index, handleClick, label, icon }) => (
  <button className={s[className]} id={id} name={positionName} type="button" onClick={(e) => handleClick(e, index)}>
   {label && <div className={s.content}>{label}</div>}
   {icon && <div className={s.content}>{icon}</div>}
  </button>
);

export default Button;
