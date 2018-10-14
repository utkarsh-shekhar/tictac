/**
 * This program is a boliler plate code for the famous tic tac toe game
 * Here box represents one placeholder for either X or a 0
 * We have a 2D array to represent the arrangement of X or O is a grid
 * 0 -> empty box
 * 1 -> box with X
 * 2 -> box with O
 *
 * Below are the tasks which needs to be completed
 * Imagine you are playing with Computer so every alternate move should be by Computer
 * X -> player
 * O -> Computer
 *
 * Winner has to be decided and has to be flashed
 *
 * Extra points will be given for the Creativity
 *
 * Use of Google is not encouraged
 *
 */
const grid = [];
const GRID_LENGTH = 3;
let turn = 'X';

function initializeGrid() {
  for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
    const tempArray = [];
    for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
      tempArray.push(0);
    }
    grid.push(tempArray);
  }
}

function getRowBoxes(colIdx) {
  let rowDivs = '';

  for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {
    let additionalClass = 'darkBackground';
    let content = '';
    const sum = colIdx + rowIdx;
    if (sum%2 === 0) {
      additionalClass = 'lightBackground'
    }
    const gridValue = grid[colIdx][rowIdx];
    if(gridValue === 1) {
      content = '<span class="cross">X</span>';
    }
    else if (gridValue === 2) {
      content = '<span class="cross">O</span>';
    }
    rowDivs = rowDivs + '<div colIdx="'+ colIdx +'" rowIdx="' + rowIdx + '" class="box ' +
      additionalClass + '">' + content + '</div>';
  }
  return rowDivs;
}

function getColumns() {
  let columnDivs = '';
  for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
    let coldiv = getRowBoxes(colIdx);
    coldiv = '<div class="rowStyle">' + coldiv + '</div>';
    columnDivs = columnDivs + coldiv;
  }
  return columnDivs;
}

function renderMainGrid() {
  const parent = document.getElementById("grid");
  const columnDivs = getColumns();
  parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

function onBoxClick(e) {
  if(e.target.tagName !== "DIV" || e.target.querySelector("span")) return;
  var rowIdx = this.getAttribute("rowIdx");
  var colIdx = this.getAttribute("colIdx");
  let newValue = 1;
  grid[colIdx][rowIdx] = newValue;
  renderMainGrid();
  if(lastTurnWon(1, colIdx, rowIdx)) showModal("You Won!");
  else {
    if(allBoxesFilled()) {
      showModal("It is a draw!");
      return;
    }
    addClickHandlers();
    bot();
  }
}

function addClickHandlers() {
  var boxes = document.getElementsByClassName("box");
  for (var idx = 0; idx < boxes.length; idx++) {
    boxes[idx].addEventListener('click', onBoxClick, false);
  }
}

function findValidbox() {
  do {
    var rowIdx = Math.floor(Math.random() * Math.floor(GRID_LENGTH));
    var colIdx = Math.floor(Math.random() * Math.floor(GRID_LENGTH));
  } while(grid[rowIdx][colIdx] !== 0)
  return [rowIdx, colIdx];
}

function bot() {
  let coordinates = findValidbox();
  let newValue = 2;
  grid[coordinates[0]][coordinates[1]] = newValue;
  renderMainGrid();
  if(lastTurnWon(2, coordinates[0], coordinates[1])) showModal("Computer Won!");
  else {
    if(allBoxesFilled()) {
      showModal("It is a draw!");
      return;
    }
    addClickHandlers();
  }

}

function allBoxesFilled() {
  for(let i = 0; i < GRID_LENGTH; i++) {
    for(let j = 0; j < GRID_LENGTH; j++) {
      if(grid[i][j] === 0) return false;
    }
  }

  return true;
}

function lastTurnWon(value, x, y) {
  // check the row
  let winner = true;
  for(let i = 0; i < GRID_LENGTH; i++) {
    if(grid[x][i] !== value) {
      winner = false;
      break;
    }
  }

  if(winner) return true;

  // check the column
  winner = true;
  for(let i = 0; i < GRID_LENGTH; i++) {
    if(grid[i][y] !== value) {
      winner = false;
      break;
    }
  }

  if(winner) return true;

  // check forward diagonal
  winner = true;
  for(let i = 0; i < GRID_LENGTH; i++) {
    if(grid[i][i] !== value) {
      winner = false;
      break;
    }
  }

  if(winner) return true;

  debugger;
  // check backward diagonal
  winner = true;
  for(let i = GRID_LENGTH - 1; i >= 0; i--) {
    if(grid[i][GRID_LENGTH - i - 1] !== value) {
      winner = false;
      break;
    }
  }

  if(winner) return true;
}


function reset() {
  console.log("reset")
  for(let i = 0; i < GRID_LENGTH; i++) {
    for(let j = 0; j < GRID_LENGTH; j++) {
      grid[i][j] = 0;
    }
  }
  const modal = document.querySelector(".modal");
  modal.classList.add('hide');
  modal.classList.remove('show');
  renderMainGrid();
  addClickHandlers();
}

function showModal(message) {
  const modal = document.querySelector(".modal");
  modal.innerHTML = `${message}<a href="#" onclick="reset()">Play Again</a>`
  modal.classList.add('show');
  modal.classList.remove('hide');
}

initializeGrid();
renderMainGrid();
addClickHandlers();
