import FileUpload from '../FileUpload/FileUpload';

const EnterYourQuestion = ({ value, onQuestionChange, onFileChange }) => {
  console.log(value, onQuestionChange, onFileChange, 'djfkldsjkljk')
  return (
    <div className="QuestionWrapper">
      <h1>Enter Your Question</h1>
      <input
        type="text"
        name="question"
        value={value}
        placeholder="Question text here"
        onChange={onQuestionChange}
      >
      </input>
      <FileUpload
        onFileChange={onFileChange}
      />
    </div>
  )
}

export default EnterYourQuestion;