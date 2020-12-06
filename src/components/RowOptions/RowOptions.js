import React from 'react';
import InputBar from '../InputBar/InputBar';
import CheckBox from '../CheckBox/CheckBox';

import './RowOptions.css';

const RowOptions = ({ row, handleInputChange, addOption, deleteOption, handleToggle, includeOther, randomize }) => (
  <div className="RowOptionsWrapper">
    <div className="OptionsTitleWrapper">
      <h3>Row Options</h3>
      <div className="VerticalDivider" />
      <button id="BulkButton" type="button">+ Bulk Answers</button>
    </div>
    {row.map((option, index) => (
      <div key={option.id} className="AnswerInputWrapper">
        {/* <div>Drag</div> */}
        <InputBar
          name="row"
          value={row[index].text}
          placeholder="Answer text here"
          index={index}
          handleInputChange={handleInputChange}
        />
        <button id="AddButton" name="row" type="button" onClick={addOption}>
          Add
        </button>
        <button id="DeleteButton" name="row" type="button" onClick={(e) => deleteOption(index, e)}>
          Delete
        </button>
      </div>
        ))}
  </div>
  );

export default RowOptions;
