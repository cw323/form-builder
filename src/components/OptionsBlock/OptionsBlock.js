import React from 'react';
import InputBar from '../InputBar/InputBar';
import Button from '../Button/Button';
import { GrAddCircle } from 'react-icons/gr';
import { RiDeleteBinLine } from 'react-icons/ri';

import './OptionsBlock.css';

const OptionsBlock = ({ title, position, positionOptions, handleInputChange, addOption, deleteOption }) => (
  <div className="OptionsBlockWrapper">
    <div className="OptionsTitleWrapper">
      <h3>{title}</h3>
      <div className="VerticalDivider" />
      <Button
        id="BulkButton"
        positionName={position}
        handleClick={addOption}
        label="+ Bulk Answers"
      />
    </div>
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
);

export default OptionsBlock;
