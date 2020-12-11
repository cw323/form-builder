import React from 'react';

const CheckBox = ({ name, checked, handleToggle, label }) => (
  <div className="CheckBox">
    <label>
      <input
        name={name}
        type="checkbox"
        checked={checked}
        onChange={(e) => handleToggle(e)}
      />
      {label}
    </label>
  </div>
);

export default CheckBox;
