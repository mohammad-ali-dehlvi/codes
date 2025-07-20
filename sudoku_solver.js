function drawSudoku(board){
  const comp = board.map((arr) => {
    return `
    <tr>
      ${arr.map(n=>`<td>${n === 0 ? "": n}</td>`).join("")}
    </tr>
    `
  }).join("")
  
  const table = document.querySelector("table#sudoku-table") || document.createElement("table")
  table.id = "sudoku-table"
  document.body.appendChild(table)
  table.innerHTML = comp
  return table
}

function solveSudoku(board) {
  const findEmpty = () => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) return [row, col];
      }
    }
    return null;
  };

  const isValid = (num, row, col) => {
    // Check row
    for (let c = 0; c < 9; c++) {
      if (board[row][c] === num) return false;
    }

    // Check column
    for (let r = 0; r < 9; r++) {
      if (board[r][col] === num) return false;
    }

    // Check 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let r = boxRow; r < boxRow + 3; r++) {
      for (let c = boxCol; c < boxCol + 3; c++) {
        if (board[r][c] === num) return false;
      }
    }

    return true;
  };

  const emptySpot = findEmpty();
  if (!emptySpot) return true; // Solved!

  const [row, col] = emptySpot;

  for (let num = 1; num <= 9; num++) {
    if (isValid(num, row, col)) {
      board[row][col] = num;
      
      if (solveSudoku(board)) return true;

      board[row][col] = 0; // backtrack
    }
  }

  return false;
}


function main() {
  const board = [
    [0,4,0,0,0,7,8,0,2],
    [1,0,0,0,9,0,0,0,5],
    [0,0,0,0,8,4,0,0,0],
    [0,5,0,0,7,2,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,8,7,5,4,9,0,0,0],
    [6,9,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,6,1],
    [0,0,5,0,0,0,4,0,0]
  ]
  const obj = solveSudoku(board)
  drawSudoku(board)
  // console.log(obj)
  // console.log(board)
}
main()
