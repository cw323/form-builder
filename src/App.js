import React from 'react';
import { orderSequence } from './utilities';
import Form from './components/Form/Form';
import data from './data';
import arrayMove from 'array-move';
import SortableList from './components/SortableList';

import s from "./App.module.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      max_allowed_questions: null,
      allowed_question_types: [],
      currentSequenceView: 0,
    }

    this.handleDelete = this.handleDelete.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
    this.selectQuestion = this.selectQuestion.bind(this);
    this.onSortEnd = this.onSortEnd.bind(this);
  }

  componentDidMount() {
    this.setState({
      ...data
    })
  }

  handleDelete(sequence) {
    const questions = [...this.state.questions];
    questions.splice(sequence-1, 1);

    for (let i = 0; i < questions.length; i++) {
      questions[i].sequence = i + 1;
    }

    this.setState({
      currentSequenceView: 0,
      questions
    })
  }

  addQuestion(newQuestion) {
    const questions = [...this.state.questions];
    const sequence = questions.length + 1;
    newQuestion.sequence = sequence;
    questions.push(newQuestion);
    this.setState({questions});
  }

  selectQuestion(index) {
    this.setState({
      currentSequenceView: index + 1
    })
  }

  onSortEnd({oldIndex, newIndex}) {
    let move = arrayMove(this.state.questions, oldIndex, newIndex);
    move = orderSequence(move);
    
    this.setState({
      questions: move
    });
  }

  render() {
    return (
      <div className={s.app}>
        <div className={s.listAndFormWrapper}> 
          <div className={s.questionsList}>
            <h1 className={s.title}>Survey</h1>
            <SortableList
              items={this.state.questions}
              onSortEnd={this.onSortEnd}
              selectQuestion={this.selectQuestion}
            />
          </div>
          <div className={s.titleAndFormWrapper}>
            <h1 className={s.title}>Setup Survey</h1>
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
        <div className={s.jSON}>{JSON.stringify(this.state)}</div>
      </div>
    );
  }
}

export default App;
