import React from 'react';
import InputBar from '../InputBar/InputBar';
import Button from '../Button/Button';

import './OptionsBlock.css';

const OptionsBlock = ({ title, position, positionOptions, handleInputChange, addOption, deleteOption }) => (
  <div className="OptionsBlockWrapper">
    <div className="OptionsTitleWrapper">
      <h3>{title}</h3>
      <div className="VerticalDivider" />
      <button id="BulkButton" type="button">+ Bulk Answers</button>
    </div>
    {positionOptions.map((option, index) => (
      <div key={option.id} className="OptionInputWrapper">
        {/* <div>Drag</div> */}
        <InputBar
          name={position}
          value={positionOptions[index].text}
          placeholder="Answer text here"
          index={index}
          handleInputChange={handleInputChange}
        />
        <Button
          id="AddButton"
          positionName={position}
          handleClick={addOption}
          label="Add"
        />
        <Button
          id="DeleteButton"
          positionName={position}
          index={index}
          handleClick={deleteOption}
          label="Delete"
        />
      </div>
    ))}
  </div>
);

export default OptionsBlock;
