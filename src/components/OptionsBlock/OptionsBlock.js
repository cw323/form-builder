import React from 'react';
import { GrAddCircle } from 'react-icons/gr';
import { RiDeleteBinLine } from 'react-icons/ri';
import InputBar from '../InputBar/InputBar';
import Button from '../Button/Button';

import './OptionsBlock.css';

const OptionsBlock = ({ title, position, positionOptions, handleInputChange, addOption, deleteOption }) => (
  <div className="OptionsBlockWrapper">
    <div className="OptionsTitleWrapper">
      <h3>{title}</h3>
      <div className="VerticalDividerOptions" />
      <Button
        id="BulkButton"
        positionName={position}
        handleClick={addOption}
        label="+ Bulk Answers"
      />
    </div>
    <div className="OptionsInputWrapper">
      {positionOptions.map((option, index) => (
        <div key={option.id} className="OptionInputWrapper">
          <InputBar
            name={position}
            value={positionOptions[index].text}
            placeholder="Answer text here"
            index={index}
            handleInputChange={handleInputChange}
          />
          <Button
            id="AddDeleteButton"
            positionName={position}
            handleClick={addOption}
            icon={<GrAddCircle className="Icon" />}
          />
          <Button
            id="AddDeleteButton"
            positionName={position}
            index={index}
            handleClick={deleteOption}
            icon={<RiDeleteBinLine className="Icon" />}
          />
        </div>
      ))}
    </div>
  </div>
);

export default OptionsBlock;
