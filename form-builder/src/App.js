import React from 'react';
import "./App.css";
import Form from './components/Form/Form';
import data from './data';
import ListOfQuestions from './components/ListOfQuestions/ListOfQuestions';

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
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      max_allowed_questions: null,
      allowed_question_types: [],
      currentSequenceView: null
    }

    this.addQuestion = this.addQuestion.bind(this);
    this.selectQuestion = this.selectQuestion.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleMove = this.handleMove.bind(this);
  };

  componentDidMount() {
    this.setState({
      ...data
    })
  }
  
  addQuestion(newQuestion) {
    const questions = [...this.state.questions];
    const sequence = questions.length + 1;
    newQuestion.sequence = sequence;
    questions.push(newQuestion);
    this.setState({questions: questions});
  }

  selectQuestion(index) {
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
    const { name } = e.target;
    const { questions, currentSequenceView } = this.state;

    if ((index === 0 && name === 'up') || (index === questions.length-1 && name === 'down')) {
      return;
    }

    const questionsArray = [...questions];
    const deletedQuestion = questionsArray.splice(index, 1);
    let newSequence;
    let splice;

    if (currentSequenceView) {
      newSequence = 'up' ? currentSequenceView+1 : currentSequenceView-1;
    }

    if (name === 'up') {
      splice = questionsArray.splice(index-1, 0, deletedQuestion[0])
    }

    if (name === 'down') {
      splice = questionsArray.splice(index+1, 0, deletedQuestion[0]);
    }

    for (let i = 0; i < questionsArray.length; i++) {
      questionsArray[i].sequence = i+1;
      if (newSequence === i+1 && currentSequenceView) {
        newSequence = questionsArray[i].sequence;
      } 
    }

    this.setState({
      questions: questionsArray,
      currentSequenceView: newSequence
    })
  }

  render() {
    let questionsList = this.state.questions.map((question, index) => {
      return (
        <div key={question.id}>
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
        
          <ListOfQuestions
            questions={this.state.questions}
            selectQuestion={this.selectQuestion}
            handleMove={this.handleMove}
          />
      </div>
    );
  }
}

// App.defaultProps = {
//   ...daga
// }

export default App;
