import React from 'react';
import './ListOfQuestion.css'

const ListOfQuestions = ({ questions, selectQuestion, handleMove }) => {
  const list = questions.map((question, index) => (
    <div key={question.id}>
      <div className="SelectQuestion" onClick={() => selectQuestion(index)}>
        <div>
          Question {index + 1}: {question.text}
        </div>
      </div>
      <button name="up" type="button" onClick={(e) => handleMove(e, index)}>Move Up</button>
      <button name="down" type="button" onClick={(e) => handleMove(e, index)}>Move Down</button>
    </div>
    ));

  return (
    <div className="ListOfQuestionsWrapper">
      <h1>List of Questions</h1>
      {list}
    </div>
  )
};

export default ListOfQuestions;
