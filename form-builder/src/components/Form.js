import React from 'react';
import './Form.css';

// need to generate ID for question and initial input, and buttons
let generateId = () => Math.floor(Math.random() * 100000) + 1;
let handleDeleteSequence;

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        // find new way to generate id
        "id": generateId(),
        // question text input
        "text": "",
        // type is selected from the drop down menu in the header? where it says "Select Grid?"
        "type": "RADIO_GRID",
        // option to upload a media in image or video form
        "media": {
          // id for media
          "id": generateId(),
          // url for media
          "url": "",
          // file name from upload
          "file_name": "",
          // image or video that was uploaded?
          "content_type": ""
        },
        "options": {
          "row": [
            {
              "id": generateId(),
              "text": "",
              "sequence": 1
            }
          ],
          "column": [
            {
              "id": generateId(),
              "text": "",
              "sequence": 1
            }
          ]
        },
        "sequence": 1,
  // randomize on submit
        "randomize": false,
        "include_other": false
    }

    this.handleLayout = this.handleLayout.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onQuestionChange = this.onQuestionChange.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.handleIncludeOther = this.handleIncludeOther.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addOption = this.addOption.bind(this);
    this.deleteOption = this.deleteOption.bind(this);
    this.handleQuestionDelete = this.handleQuestionDelete.bind(this);
  }

  handleLayout(e) {
    this.setState(prevState => ({
      ...prevState,
      type: e.target.value
    }));
  }

  handleInputChange(index, e) {
    let name = e.target.name; // row
// entire row array
    const items = [...this.state.options[name]];
    // one item in the row array
    items[index].text = e.target.value;

    let opposite;
    let oppositeName;

    console.log(items, 'ITEMS INSIDE HANDLE INPUT')
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
    e.preventDefault();
    console.log('inside ADD OPTIONd', e.target.name)
    let name = e.target.name;

    // if (e.target.name === 'row') {
      console.log('INSIDE ROW IF STATEMENT')
  // find a way to SPLICE it so that it adds right below the wanted area
      const options = [...this.state.options[name]];
      console.log('OPTIONS, inside add options', options)
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
    let options = this.state.options;

    let name = e.target.name;
    if (options[name].length === 1) return;
    // update sequence

    let optionsArray = [...options[name]];
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

  handleIncludeOther(e) {
    let isChecked = this.state.include_other ? false : true;
    this.setState(prevState => ({
        ...prevState,
        include_other: isChecked
    }));
  }

  onQuestionChange(e) {
    this.setState(prevState => ({
        ...prevState,
        text: e.target.value
    }));
  }

  onFileChange(e) {
    let file = e.target.files[0];
    let question = {...this.state};

    console.log(file, 'this is file')

    question.media = {
      // id I used last modified because it is unique or I can use generateId
      id: file.lastModified,
      url: file.webKitRelativePath,
      file_name: file.name,
      content_type: file.type,
    }

    this.setState({
      // selectedFile: e.target.files[0],
      media: question
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    const { text, type, options } = this.state;
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

    this.props.addQuestion(this.state);

    this.setState({
        "id": generateId(),
        // question text input
        "text": "",
        // type is selected from the drop down menu in the header? where it says "Select Grid?"
        "type": "RADIO_GRID",
        // option to upload a media in image or video form
        "media": {
          // id for media
          "id": 0,
          // url for media
          "url": "",
          // file name from upload
          "file_name": "",
          // image or video that was uploaded?
          "content_type": ""
        },
        "options": {
          "row": [
        // an array of options / answers that the user has entered.
            {
      
              "id": generateId(),
              // answer text input
              "text": "",
              //
              "sequence": 1
            }
          ],
          "column": [
            {
              "id": generateId(),
              "text": "",
              "sequence": 1
            }
          ]
        },
        "sequence": 0,
        "randomize": true,
        "include_other": false
      }, () => console.log(this.state, 'THIS STATE AFTER SUB'));
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):

    if (!this.props.viewQuestion) {
      return;
    }

    if (this.props.viewQuestion !== prevProps.viewQuestion) {
      this.setState(prevState => ({
        ...prevState,
        question: this.props.viewQuestion
      }));
    }
  }

  // componentWillUnmount() {

  // }
  handleQuestionDelete(sequence) {
    // this.props.handleDelete(sequence);
    handleDeleteSequence = sequence;

    this.setState({
        "id": generateId(),
        // question text input
        "text": "",
        // type is selected from the drop down menu in the header? where it says "Select Grid?"
        "type": "RADIO_GRID",
        // option to upload a media in image or video form
        "media": {
          // id for media
          "id": 0,
          // url for media
          "url": "",
          // file name from upload
          "file_name": "",
          // image or video that was uploaded?
          "content_type": ""
        },
        "options": {
          "row": [
        // an array of options / answers that the user has entered.
            {
      
              "id": generateId(),
              // answer text input
              "text": "",
              //
              "sequence": 1
            }
          ],
          "column": [
            {
              "id": generateId(),
              "text": "",
              "sequence": 1
            }
          ]
        },
        "sequence": 0,
        "randomize": true,
        "include_other": false
      }, () => this.props.handleDelete(handleDeleteSequence));
  }

  render() {
    // console.log(this.state.question.options.row,'inside render')
    // console.log(this.state.question.options, 'QUESTION OPTIONS')
    // console.log(typeof this.state.question.options.row, 'row type', typeof this.state.question.options.column, 'column type')
    // console.log(Array.isArray(this.state.question.options.row), Array.isArray(this.state.question.options.column))
    let disableButton = false;

    if (this.props.questionsLength === this.props.maxQuestions) {
      disableButton = true;
    }

    // console.log(addQuestionButton)
    // on submit should generate an ID for this question

    let column = () => {
      if (this.state.type === 'RADIO_GRID' || this.state.type === 'CHECK_BOX_GRID') {
        return (
          <div className="ColumnOptionsWrapper">
            <div className="OptionsTitleWrapper">
              <h1>Column Options</h1>
              <div className="VerticleDivider"></div>
              <button type="button">+ Bulk Answers</button>
            </div>
            {this.state.options.column.map((option, index) => {
              return (
                <div key={option.id} className="AnswerInputWrapper">
                  <div>Drag</div>
                  {/* input name not needed */}
                  <input
                    name="column"
                    type="text"
                    value={this.state.options.column[index].text}
                    placeholder="Answer text here"
                    onChange={(e) => this.handleInputChange(index, e)}
                  >
                  </input>
                  <button name="column" type="button" onClick={this.addOption}>Add</button>
                  <button name="column" type="button" onClick={(e) => this.deleteOption(index, e)}>Delete</button>
                </div>
            )
          })}
          </div>
        )
      }
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
                // let text = option.replace('_');
                return <option value={option}>Select {option}</option>;
              })}
            </select>
          </div>
          <div className="VerticleDivider"></div>
          <div className="EditOptionWrapper">
            <button type="button" onClick={() => this.handleQuestionDelete(this.state.sequence)}>Delete</button>
          </div>
        </div>
{/* QUESTION */}
      <div className="QuestionWrapper">
        <h1>Enter Your Question</h1>
        <input
          type="text"
          name="question"
          value={this.state.text}
          placeholder="Question text here"
          onChange={this.onQuestionChange}
        >
        </input>
{/* add file type */}
        <input className="FileUpload" type="file" onChange={this.onFileChange} /> 
      </div>

{/* ANSWERS OPTIONS */}
      <div className="RowOptionsWrapper">
        <div className="OptionsTitleWrapper">
          <h1>Row Options</h1>
          <div className="VerticleDivider"></div>
          <button type="button">+ Bulk Answers</button>
        </div>
          {this.state.options.row.map((option, index) => {
            return (
              <div key={option.id} className="AnswerInputWrapper">
                <div>Drag</div>
                <input
                  name="row"
                  type="text"
                  value={this.state.options.row[index].text}
                  placeholder="Answer text here"
                  onChange={(e) => this.handleInputChange(index, e)}
                >
                </input>
                <button name="row" type="button" onClick={this.addOption}>Add</button>
                <button name="row" type="button" onClick={(e) => this.deleteOption(index, e)}>Delete</button>
              </div>
            )
          })}
{/* CHECKBOX FOR ROW ANSWERS */}
        <div className="AllowMultipleResponses">
        <label>
          <input
            name="include_other"
            type="checkbox"
            checked={this.state.include_other}
            onChange={this.handleIncludeOther} />
            Allow multiple responses per row
          </label>
        </div>
      </div>
{/* ANSWER FOR COLUMN IF GRID LAYOUT SELECTED */}
      {column()}
{/* BUTTON TO SAVE THE QUESTION FORM */}
      {/* {addQuestionButton} */}
      <input type="submit" disabled={disableButton} value="+ Add Question"/>
    </form>
    );
  }
}

export default Form;



