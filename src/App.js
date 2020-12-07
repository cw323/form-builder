import React from 'react';
import "./App.css";
import arrayMove from 'array-move';
import Form from './components/Form/Form';
import data from './data';
import SortableList from './components/SortableList';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      max_allowed_questions: null,
      allowed_question_types: [],
      currentSequenceView: null,
    }

    this.handleDelete = this.handleDelete.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
    this.selectQuestion = this.selectQuestion.bind(this);
    this.onSortEnd = this.onSortEnd.bind(this);
  };

  componentDidMount() {
    this.setState({
      ...data
    })
  }

  handleDelete(sequence) {
    const { questions } = this.state;
    const prevQuestions = [...questions];
    prevQuestions.splice(sequence - 1, 1);

    for (let i = 0; i < prevQuestions.length; i += 1) {
      prevQuestions[i].sequence = i + 1;
    }

    this.setState({
      currentSequenceView: 0,
      prevQuestions
    })
  }

  onSortEnd({oldIndex, newIndex}) {
    const { questions } = this.state;
    const move = arrayMove(questions, oldIndex, newIndex);
    
    for (let i = 0; i < move.length; i += 1) {
      move[i].sequence = i + 1;
    }

    this.setState({
      questions: move
    });
  };

  selectQuestion(index) {
    this.setState({
      currentSequenceView: index + 1
    })
  }

  addQuestion(newQuestion) {
    const questions = [...this.state.questions];
    const sequence = questions.length + 1;
    newQuestion.sequence = sequence;
    questions.push(newQuestion);
    this.setState({questions: questions});
  }

  render() {
    return (
      <div className="App">
        <div className="ListAndFormWrapper"> 
          <div className="QuestionsList">
            <h1 className="Title">Survey</h1>
            <SortableList
              items={this.state.questions}
              onSortEnd={this.onSortEnd}
              selectQuestion={this.selectQuestion}
            />
          </div>
          <div className="TitleAndFormWrapper">
            <h1 className="Title">Setup Survey</h1>
            <div className="FormWrapper">
              <Form
                questionTypes={this.state.allowed_question_types}
                addQuestion={this.addQuestion}
                questionsLength={this.state.questions.length}
                maxQuestions={this.state.max_allowed_questions}
                viewQuestion={this.state.questions[this.state.currentSequenceView-1]}
                handleDelete={this.handleDelete}
              />
            </div>
          </div>
        </div>
        <div>{JSON.stringify(this.state)}</div>
        <div>LIST HERE</div>
      </div>
    );
  }
}

export default App;
