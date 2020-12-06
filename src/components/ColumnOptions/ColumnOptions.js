import React from 'react';
import InputBar from '../InputBar/InputBar';

import './ColumnOptions.css';

const ColumnOptions = ({ type, column, handleInputChange, addOption, deleteOption }) => {
  if (type === 'RADIO_GRID' || type === 'CHECK_BOX_GRID') {
    return (
      <div className="ColumnOptionsWrapper">
        <div className="OptionsTitleWrapper">
          <div className="VerticalDivider" />
          <h3>Column Options</h3>
          <button id="BulkButton" type="button">+ Bulk Answers</button>
        </div>
        {column.map((option, index) => (
          <div key={option.id} className="AnswerInputWrapper">
            {/* <div>Drag</div> */}
            <InputBar
              name="column"
              value={column[index].text}
              placeholder="Answer text here"
              index={index}
              handleInputChange={handleInputChange}
            />
            <button id="AddButton" name="column" type="button" onClick={addOption}>
              Add
            </button>
            <button id="DeleteButton" name="column" type="button" onClick={(e) => deleteOption(index, e)}>
              Delete
            </button>
          </div>
          ))}
      </div>
    )
  } 
    return null;
  
}

export default ColumnOptions;
