import React from 'react';
import { GrAddCircle } from 'react-icons/gr';
import { RiDeleteBinLine } from 'react-icons/ri';
import InputBar from '../InputBar/InputBar';
import Button from '../Button/Button';

import s from './OptionsBlock.module.css';

const OptionsBlock = ({ title, position, positionOptions, handleInputChange, addOption, deleteOption }) => (
  <div className={s.optionsBlockWrapper}>
    <div className={s.optionsTitleWrapper}>
      <h3>{title}</h3>
      <div className={s.verticalDivider} />
      <Button
        className="bulkButton"
        id="BulkButton"
        positionName={position}
        handleClick={addOption}
        label="+ Bulk Answers"
      />
    </div>
    <div className={s.optionsInputWrapper}>
      {positionOptions.map((option, index) => (
        <div key={option.id} className={s.optionInputWrapper}>
          <InputBar
            name={position}
            value={positionOptions[index].text}
            placeholder="Answer text here"
            index={index}
            handleInputChange={handleInputChange}
          />
          <Button
            className="addDeleteButton"
            id="AddDeleteButton"
            positionName={position}
            index={index}
            handleClick={addOption}
            icon={<GrAddCircle className={s.icon} />}
          />
          <Button
            className="addDeleteButton"
            id="AddDeleteButton"
            positionName={position}
            index={index}
            handleClick={deleteOption}
            icon={<RiDeleteBinLine className={s.icon} />}
          />
        </div>
      ))}
    </div>
  </div>
);

export default OptionsBlock;
