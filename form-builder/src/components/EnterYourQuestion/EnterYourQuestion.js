import './EnterYourQuestion.css';
import FileUpload from '../FileUpload/FileUpload';

const EnterYourQuestion = ({ value, onQuestionChange, onFileChange }) => {
  return (
    <div className="QuestionWrapper">
      <h3>Enter Your Question</h3>
      <div className="QuestionFileWrapper">
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
    </div>
  )
}

export default EnterYourQuestion;