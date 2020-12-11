import React from 'react';
import FileUpload from '../FileUpload/FileUpload';
import InputBar from '../InputBar/InputBar';

import './EnterYourQuestion.css';

const EnterYourQuestion = ({ value, onQuestionChange, onFileChange }) => (
  <div className="QuestionBlockWrapper">
    <h3>Enter Your Question</h3>
    <div className="QuestionInputWrapper">
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
