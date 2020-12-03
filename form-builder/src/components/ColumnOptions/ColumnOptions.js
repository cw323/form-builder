import './ColumnOptions.css';

const ColumnOptions = ({ type, column, handleInputChange, addOption, deleteOption }) => {
  if (type === 'RADIO_GRID' || type === 'CHECK_BOX_GRID') {
    return (
        <div className="ColumnOptionsWrapper">
          <div className="OptionsTitleWrapper">
          <div className="VerticalDivider"></div>
            <h3>Column Options</h3>
            <button id="bulkButton" type="button">+ Bulk Answers</button>
          </div>
          {column.map((option, index) => {
            return (
              <div key={option.id} className="AnswerInputWrapper">
                {/* <div>Drag</div> */}
                <input
                  name="column"
                  type="text"
                  value={column[index].text}
                  placeholder="Answer text here"
                  onChange={(e) => handleInputChange(index, e)}
                >
                </input>
                <button id="addButton" name="column" type="button" onClick={addOption}>
                  Add
                </button>
                <button id="deleteButton" name="column" type="button" onClick={(e) => deleteOption(index, e)}>
                  Delete
                </button>
              </div>
          )
        })}
        </div>
    )
  } else {
    return null;
  }
}

export default ColumnOptions;