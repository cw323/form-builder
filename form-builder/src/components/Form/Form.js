import React from 'react';
import './Form.css';
import shuffle from '../../utilities/shuffle'
import QuestionTypes from '../QuestionTypes/QuestionTypes';
import EnterYourQuestion from '../EnterYourQuestion/EnterYourQuestion';
import RowOptions from '../RowOptions/RowOptions'
import ColumnOptions from '../ColumnOptions/ColumnOptions';

// need to generate ID for question and initial input, and buttons
let generateId = () => Math.floor(Math.random() * 100000) + 1;
let handleDeleteSequence;

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: generateId(),
      text: "",
      type: "RADIO_GRID",
      media: {
        id: generateId(),
        url: "",
        file_name: "",
        content_type: ""
      },
      options: {
        row: [
          {
            id: generateId(),
            text: "",
            sequence: 1
          }
        ],
        column: [
          {
            id: generateId(),
            text: "",
            sequence: 1
          }
        ]
      },
      sequence: 1,
      randomize: false,
      include_other: false
    }

    this.handleLayout = this.handleLayout.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onQuestionChange = this.onQuestionChange.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addOption = this.addOption.bind(this);
    this.deleteOption = this.deleteOption.bind(this);
    this.handleQuestionDelete = this.handleQuestionDelete.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  handleLayout(e) {
    this.setState(prevState => ({
      ...prevState,
      type: e.target.value
    }));
  }

  handleInputChange(index, e) {
    const { name, value } = e.target;
    const items = [...this.state.options[name]];
    // one item in the row array
    items[index].text = value;

    let opposite;
    let oppositeName;

    if (name === 'row') {
      opposite = [...this.state.options.column]
      oppositeName = 'column';
    } else {
      opposite = [...this.state.options.row]
      oppositeName = 'row';
    }

    this.setState(prevState => ({
      ...prevState,
      options: {
        ...prevState.options,
        [name]: items,
        [oppositeName]: opposite
      }
    }));

  }

  addOption(e) {
    const { name } = e.target;
    const options = [...this.state.options[name]];
    const sequence = this.state.options[name].length + 1;
    options.push({
      "id": generateId(),
      "text": "",
      "sequence": sequence,
    });

    this.setState(prevState => ({
      ...prevState,
      options: {
        ...prevState.options,
        [name]: options
      }
    }))
  }

  deleteOption(index, e) {
    const { options } = this.state;
    const { name } = e.target;
    
    if (options[name].length === 1) return;

    const optionsArray = [...options[name]];
    optionsArray.splice(index, 1);
    let opposite;
    let oppositeName;

    for (let i = 0; i < optionsArray.length; i++) {
      optionsArray[i].sequence = i + 1;
    }

    if (name === 'row') {
      opposite = [...this.state.options.column];
      oppositeName = 'column';
    } else {
      opposite = [...this.state.options.row];
      oppositeName = 'row';
    }

    this.setState(prevState => ({
      ...prevState,
        options: {
          ...prevState.options,
          [name]: optionsArray,
          [oppositeName]: opposite
        }
    }));
  }

  handleToggle(e) {
    const { name } = e.target;
    console.log(name, 'name in toggle function')
    

    const isChecked = this.state[name] ? false : true;
    this.setState(prevState => ({
        ...prevState,
        [name]: isChecked
    }), () => console.log(this.state[name], 'toggle state'));
  }

  onQuestionChange(e) {
    const { value } = e.target;
    console.log(value, 'value in on Question change')
    this.setState(prevState => ({
        ...prevState,
        text: value
    }));
  }

  onFileChange(e) {
    const file = e.target.files[0];
    const question = {...this.state};

    question.media = {
      id: file.lastModified,
      url: file.webKitRelativePath,
      file_name: file.name,
      content_type: file.type,
    }

    this.setState({
      media: question
    })
  }

  resetState(sequence) {
    this.setState({
      id: generateId(),
      text: "",
      type: "RADIO_GRID",
      media: {
        id: generateId(),
        url: "",
        file_name: "",
        content_type: ""
      },
      options: {
        row: [
          {
            id: generateId(),
            text: "",
            sequence: 1
          }
        ],
        column: [
          {
            id: generateId(),
            text: "",
            sequence: 1
          }
        ]
      },
      sequence: 1,
      randomize: false,
      include_other: false
    }, () => {
      if (sequence) {
        this.props.handleDelete(handleDeleteSequence);
      }
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    const { text, type, options, randomize } = this.state;
    const { row, column } = options;
    
    if (text.length < 5 || row.length === 0) {
      return alert('Question too short or not enough answer options.');
    }

    for (let i = 0; i < row.length; i++) {
      if (row[i].text === '') {
        return alert('Please fill in or delete answer options input box.')
      }
    }

    if (type === "RADIO_GRID" || type === "CHECK_BOX_GRID") {
      for (let i = 0; i < column.length; i++) {
        if (column[i].text === '') {
          return alert('Please fill in answer options input or delete answer option.')
        }
      }
    }

    let changedState = {...this.state};

    if (randomize) {
      let rowsArray = [...row];
      rowsArray = shuffle(rowsArray)
      for (let i = 0; i < rowsArray.length; i++) {
        rowsArray[i].sequence = i+1;
      }
      // rename
      changedState.options.row = rowsArray;
    }

    this.props.addQuestion(changedState);

    this.resetState();
  }

  componentDidUpdate(prevProps) {
    const { viewQuestion } = this.props;
    if (!viewQuestion) return;

    if (viewQuestion !== prevProps.viewQuestion) {
      this.setState({
        ...viewQuestion
      })
    }
  }

  handleQuestionDelete(sequence) {
    handleDeleteSequence = sequence;
      this.resetState(handleDeleteSequence);
  }

  render() {
    let disableButton = false;

    if (this.props.questionsLength === this.props.maxQuestions) {
      disableButton = true;
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="HeaderBar">
          <div>...</div>
          <div className="LayoutSelectorWrapper">
            <select
              className="LayoutSelector"
              value={this.state.type}
              onChange={this.handleLayout}
            >
              {this.props.questionTypes.map(option => {
                return <QuestionTypes option={option} />;
              })}
            </select>
          </div>
          <div className="VerticleDivider"></div>
          <div className="EditOptionWrapper">
            <button type="button" onClick={() => this.handleQuestionDelete(this.state.sequence)}>Delete</button>
          </div>
        </div>
{/* QUESTION */}
      <EnterYourQuestion 
        value={this.state.text}
        onQuestionChange={this.onQuestionChange}
        onFileChange={this.onFileChange}
      />
{/* ROW ANSWERS OPTIONS */}
      <RowOptions
        row={this.state.options.row}
        handleInputChange={this.handleInputChange}
        addOption={this.addOption}
        deleteOption={this.deleteOption}
        handleToggle={this.handleToggle}
        includeOther={this.state.include_other}
        randomize={this.state.randomize}
      />
{/* ANSWER FOR COLUMN IF GRID LAYOUT SELECTED */}
      <ColumnOptions
        type={this.state.type}
        column={this.state.options.column}
        handleInputChange={this.handleInputChange}
        addOption={this.addOption}
        deleteOption={this.deleteOption}
      />
{/* BUTTON TO SAVE THE QUESTION FORM */}
      <input type="submit" disabled={disableButton} value="+ Add Question"/>
    </form>
    );
  }
}

export default Form;
