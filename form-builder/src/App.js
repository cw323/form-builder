// import './App.css';

// function App() {
//   return (
//     <div className="App">
      
//     </div>
//   );
// }

// export default App;
import React from 'react';
import "./App.css";
import Form from './components/Form';
import data from './data';

const Header = ({ surveyTitle }) => {
  return (
    <h1>{surveyTitle}</h1>
  )
}

const Footer = () => {
  //
  return (
  <div>
    <button onClick={() => alert('hi')}>Save For Later</button>
    <button>Previous</button>
    <button>Next</button>
  </div>
  )
}

class App extends React.Component {
  // should have state of all questions
  // const [questions, setQuestions] = useState([]);
  // should have state of drafts "save for letter"
  constructor(props) {
    super(props);
    this.state = {
      "questions": [],
      "max_allowed_questions": 10,
      "allowed_question_types": ["RADIO", "CHECK_BOX", "RADIO_GRID", "CHECK_BOX_GRID"],
      "currentSequenceView": 0
    }

    this.addQuestion = this.addQuestion.bind(this);
    this.selectQuestion = this.selectQuestion.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleMove = this.handleMove.bind(this);
  };
  
  addQuestion(newQuestion) {
    // make shallow copy of questions array
    let questions = [...this.state.questions];
    let sequence = questions.length + 1;
    newQuestion.sequence = sequence;
    questions.push(newQuestion);
    this.setState({questions: questions});
    console.log('question added', this.state)
  }

  selectQuestion(index) {
    let question = this.state.questions[index];
    this.setState({
      currentSequenceView: index + 1
    })
  }

  handleDelete(sequence) {
    let questions = [...this.state.questions];
    questions.splice(sequence-1, 1);

    for (let i = 0; i < questions.length; i++) {
      questions[i].sequence = i + 1;
    }
    
    this.setState({
      currentSequenceView: 0,
      questions
    })
  }

  handleMove(index, e) {
    let name = e.target.name;

    if ((index === 0 && name === 'up') || (index === this.state.questions.length-1 && name === 'down')) {
      console.log(index, 'THIS IS INDEX')
      return;
    }

    const { questions } = this.state;
    let questionsArray = [...questions];
    let deletedQuestion = questionsArray.splice(index, 1);
    let newSequence;

    if (this.state.currentSequenceView) {
      newSequence = 'up' ? this.state.currentSequenceView+1 : this.state.currentSequenceView-1;
    }

    if (name === 'up') {
      let splice = questionsArray.splice(index-1, 0, deletedQuestion[0])
      console.log('HANDLME MOVE UP', splice)
      // questionsArray.splice(index-1, 0, deletedQuestion[0]);
    }

    if (name === 'down') {
      let splice = questionsArray.splice(index+1, 0, deletedQuestion[0]);
      console.log('HANDLME MOVE DOWN', splice)
      // questionsArray.splice(index, 0, deletedQuestion[0]);
    }
    console.log(questionsArray,'THIS IS Q ARR')

    for (let i = 0; i < questionsArray.length; i++) {
      questionsArray[i].sequence = i+1;
      if (newSequence === i+1 && this.state.currentSequenceView) {
        newSequence = questionsArray[i].sequence;
      } 
    }

    this.setState({
      questions: questionsArray,
      currentSequenceView: newSequence
    })
  }

  render() {
    console.log(this.state, 'STATE IN APP')
    // if questions state has length of 10, disable add question button
    let questionsList = this.state.questions.map((question, index) => {
      return (
        <div>
          <div onClick={() => this.selectQuestion(index)}>
            Question {index + 1}: {question.text}
          </div>
          <button name="up" type="button" onClick={(e) => this.handleMove(index, e)}>up</button>
          <button name="down" type="button" onClick={(e) => this.handleMove(index, e)}>down</button>
        </div>
      )
    })

    return (
      <div className="App">
        <h1 className="title">Setup Survey</h1>
        <Form
          questionTypes={this.state.allowed_question_types}
          addQuestion={this.addQuestion}
          questionsLength={this.state.questions.length}
          maxQuestions={this.state.max_allowed_questions}
          viewQuestion={this.state.questions[this.state.currentSequenceView-1]}
          handleDelete={this.handleDelete}
        />
        {/* <Footer /> */}

        {JSON.stringify(this.state)}
        <h1>List of Questions</h1>
          <h2>{questionsList}</h2>
      </div>
    );
  }
}

export default App;
