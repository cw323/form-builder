import React from 'react';
import InputBar from '../InputBar/InputBar';

const OptionsBlock = ({ title, position, positionOptions, handleInputChange, addOption, deleteOption }) => (
  <div className="OptionsBlockWrapper">
    <div className="OptionsTitleWrapper">
      <h3>{title}</h3>
      <div className="VerticalDivider" />
      <button id="BulkButton" type="button">+ Bulk Answers</button>
    </div>
    {positionOptions.map((option, index) => (
      <div key={option.id} className="AnswerInputWrapper">
        {/* <div>Drag</div> */}
        <InputBar
          name={position}
          value={positionOptions[index].text}
          placeholder="Answer text here"
          index={index}
          handleInputChange={handleInputChange}
        />
        <button id="AddButton" name={position} type="button" onClick={addOption}>
          Add
        </button>
        <button id="DeleteButton" name={position} type="button" onClick={(e) => deleteOption(index, e)}>
          Delete
        </button>
      </div>
    ))}
  </div>
);

export default OptionsBlock;
