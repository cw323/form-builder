const inputCheck = (text, type, row, column) => {
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
}

export default inputCheck;