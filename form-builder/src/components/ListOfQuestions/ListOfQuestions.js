const ListOfQuestions = ({ questions, selectQuestion, handleMove }) => {
  const list = questions.map((question, index) => {
    return (
      <div key={question.id}>
        <div onClick={() => selectQuestion(index)}>
          Question {index + 1}: {question.text}
        </div>
        <button name="up" type="button" onClick={(e) => handleMove(index, e)}>up</button>
        <button name="down" type="button" onClick={(e) => handleMove(index, e)}>down</button>
      </div>
    )
  });

  return (
    <div className="ListOfQuestionsWrapper">
      <h1>List of Questions</h1>
      {list}
    </div>
  )
};

export default ListOfQuestions;