import React from 'react';
import s from './CheckBox.module.css';

const CheckBox = ({ className, name, checked, handleToggle, label }) => {
  let toggle = s.checkToggle;
  let span = null;

  if (name === 'randomize') {
    toggle = s.toggle;
    span = <span className={s.toggleSlider}></span>;
  }

  return (
    <label className={toggle}>
      <input
        className={s.checkBoxInput}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={(e) => handleToggle(e)}
      />
      {span}
      <div className={s[className]}>
        {label}
      </div>
    </label>
  );
};

export default CheckBox;
