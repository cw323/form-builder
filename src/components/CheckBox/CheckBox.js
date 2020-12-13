import React from 'react';
import './CheckBox.css';

const CheckBox = ({ name, checked, handleToggle, textClass, label }) => {
  let toggle = 'CheckToggle';
  let span = null;

  if (name === 'randomize') {
    toggle = 'Toggle';
    span = <span className="ToggleSlider"></span>;
  }

  return (
    <label className={toggle}>
      <input
        className="CheckBoxInput"
        name={name}
        type="checkbox"
        checked={checked}
        onChange={(e) => handleToggle(e)}
      />
      {span}
      <div className={textClass}>
        {label}
      </div>
    </label>
  );
};

export default CheckBox;
