import './RowOptions.css';

const RowOptions = ({ row, handleInputChange, addOption, deleteOption, handleToggle, includeOther, randomize }) => {
  return (
    <div className="RowOptionsWrapper">
      <div className="OptionsTitleWrapper">
        <h3>Row Options</h3>
        <div className="VerticalDivider"></div>
        <button type="button">+ Bulk Answers</button>
      </div>
      {row.map((option, index) => {
        return (
          <div key={option.id} className="AnswerInputWrapper">
            <div>Drag</div>
            <input
              name="row"
              type="text"
              value={row[index].text}
              placeholder="Answer text here"
              onChange={(e) => handleInputChange(index, e)}
            >
            </input>
            <button name="row" type="button" onClick={addOption}>Add</button>
            <button name="row" type="button" onClick={(e) => deleteOption(index, e)}>Delete</button>
          </div>
        )
      })}
      <div className="AllowMultipleResponses">
        <label>
          <input
            name="include_other"
            type="checkbox"
            checked={includeOther}
            onChange={(e) => handleToggle(e)}
          />
            Allow multiple responses per row
        </label>
      </div>
      <div className="RandomizeRows">
        <label>
          <input
            name="randomize"
            type="checkbox"
            checked={randomize}
            onChange={(e) => handleToggle(e)}
          />
            Randomize Rows
        </label>
    </div>
  </div>
  )
};

export default RowOptions;