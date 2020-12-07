export const shuffle = (array) => {
  const arr = [...array];
  let currentIndex = arr.length;
  let tempValue;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    tempValue = arr[currentIndex];
    arr[currentIndex] = arr[randomIndex];
    arr[randomIndex] = tempValue;
  }

  return arr;
};

export const inputCheck = (text, type, row, column) => {
  if (text.length < 5 || row.length === 0) {
    alert('Question too short or not enough answer options.');
    return false;
  }

  for (let i = 0; i < row.length; i++) {
    if (row[i].text === '') {
      alert('Please fill in or delete answer options input box.');
      return false;
    }
  }

  if (type === "RADIO_GRID" || type === "CHECK_BOX_GRID") {
    for (let i = 0; i < column.length; i += 1) {
      if (column[i].text === '') {
        alert('Please fill in answer options input or delete answer option.');
        return false;
      }
    }
  }

  return true;
};

export const generateId = () => Math.floor(Math.random() * 100000) + 1;
