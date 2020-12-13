import React from 'react';
import FileUpload from '../FileUpload/FileUpload';
import InputBar from '../InputBar/InputBar';

import s from './EnterYourQuestion.module.css';

const EnterYourQuestion = ({ value, onQuestionChange, onFileChange }) => (
  <div className={s.questionBlockWrapper}>
    <h3>Enter Your Question</h3>
    <div className={s.questionInputWrapper}>
      <InputBar
        name="question"
        value={value}
        placeholder="Question text here"
        handleInputChange={onQuestionChange}
      />
      <FileUpload
        onFileChange={onFileChange}
      />
    </div>
  </div>
);

export default EnterYourQuestion;
