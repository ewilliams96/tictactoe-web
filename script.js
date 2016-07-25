// constants

var PLAYER_O = 0;
var PLAYER_X = 1;


// initialize game
var rows = [];
var cells = [];
var turn = 1;
var NUM_ROWS = 3; // default

// create table
var ticTacTable = document.getElementById("gameboard");

initGame(NUM_ROWS);

var sizeSelector = document.getElementById("gamesize");
sizeSelector.addEventListener("change", function(){
  var size = sizeSelector.options[sizeSelector.selectedIndex].text;
  clearTable();
  initGame(size);
});

function initGame(gameSize){
    NUM_ROWS = gameSize;
    for(var i = 0; i < NUM_ROWS; i++ ){
    var row = ticTacTable.insertRow(i);
    rows.push(row);

    var rowCells = []
    // insert table cells and add listeners
    for(var j = 0; j < NUM_ROWS; j++){
      var cell = rows[i].insertCell(j);

      // set cell style

      var styleString = "background-color: #ff9999";
      cell.setAttribute("style", styleString);
      //console.log(cell)

      // set cell class
      cell.className = "cell";

      // add on click listener
      cell.addEventListener('click', function(){
        if(this.innerHTML != ""){
          alert("Try another spot!");
          return;
        }
        // determine which marking and set
        if(turn == PLAYER_O) { this.innerHTML = "O";}
        else { this.innerHTML = "X";}

        // check game status
        if(gameStatus() == null){
          switchTurn();
          setStatusMessage();
        }
        else{
          // if someone has won the game, alert and start new game
          if(gameStatus() == "Tie"){
            alert("Tie game.");
          }
          else{
            alert(gameStatus() + " has won!");
          }

          clearGame();
        }

      } );
      // put cell in rowcells
      rowCells.push(cell);
    }
    // put rowcells in cells (array of arrays)
    cells.push(rowCells);
  }

  //initialize status
  setStatusMessage();
}


// switch turns
function switchTurn(){
  if(turn == PLAYER_O){
    turn = PLAYER_X;
  }
  else{
    turn = PLAYER_O;
  }
}

// check if there is a winner
// if winner, return winner; if tie, return "Tie", else return null
function gameStatus(){
  var winner = null;

  //check rows
  winner = checkRows();
  if(winner != null){ return winner; }


  winner = checkColumns();
  if(winner != null){ return winner; }


  winner = checkDiagonals();
  if(winner != null){ return winner; }

  if(checkTie()){
    return "Tie";
  }

  // return null if no conclusion to game yet
  return null;
}

// return winner if there is one, else return null
function checkRows(){

  // loop through rows
  for(var i = 0; i < NUM_ROWS; i++){
    var ocount = 0;
    var xcount = 0;

    // count x's and o's in rows
    for(var j = 0; j < NUM_ROWS; j++){
      var currentCell = cells[i][j];
      var mark = currentCell.innerHTML;
      if(mark == "O"){ ocount++; }
      else if(mark == "X"){ xcount++; }
      else{ break; } // break if empty cell (row can't be ful)

      // break if combination of marks
      if(xcount > 0 && ocount > 0){ break; }

    }
    // check if full row
    if(xcount == NUM_ROWS){ return "X"; }
    else if(ocount == NUM_ROWS){ return "O";}

  }
  return null;
}

// return winner if there is one, else return null
function checkColumns(){
  // loop through cols
  for(var i = 0; i < NUM_ROWS; i++){
    var ocount = 0;
    var xcount = 0;

    // count x's and o's in cols
    for(var j = 0; j < NUM_ROWS; j++){
      var currentCell = cells[j][i];
      var mark = currentCell.innerHTML;
      if(mark == "O"){ ocount++; }
      else if(mark == "X"){ xcount++; }
      else{ break; } // break if empty cell

      //break if combination of marks
      if(xcount > 0 && ocount > 0){ break; }
    }
    // check if full cols
    if(xcount == NUM_ROWS){ return "X"; }
    else if(ocount == NUM_ROWS){ return "O";}

  }

  return null;
}

// return winner if there is one, else return null
function checkDiagonals(){
  // check diagonals
  var ocount = 0;
  var xcount = 0;
  for(var i = 0; i < NUM_ROWS; i++){
    var currentCell = cells[i][i];
    var mark = currentCell.innerHTML;
    if(mark == "O"){ ocount++; }
    else if(mark == "X"){ xcount++; }
    else{ break; }

    if(ocount > 0 && xcount > 0){
      break;
    }
  }

  if(xcount == NUM_ROWS){ return "X"; }
  else if(ocount == NUM_ROWS){ return "O";}

  ocount = 0;
  xcount = 0;
  lastIndex = NUM_ROWS - 1
  for(var i = 0; i < NUM_ROWS; i++){
    var currentCell = cells[i][lastIndex - i]
    var mark = currentCell.innerHTML;
    if(mark == "O"){ ocount++; }
    else if(mark == "X"){ xcount++; }
    else{ break; }

    if(ocount > 0 && xcount > 0){
      break;
    }
  }
  if(xcount == NUM_ROWS){ return "X"; }
  else if(ocount == NUM_ROWS){ return "O";}

  return null;
}

// return true if tie, return false if game is still going
function checkTie(){
  // check if full gameboard
  for(var i = 0; i < NUM_ROWS; i++){
    for (var j = 0; j < NUM_ROWS; j++){
      if(cells[i][j].innerHTML == ""){
        return false; // empty cell, game not tied
      }
    }
  }
  return true;
}

// clear O's and X's to restart game
function clearGame(){
  for(var i = 0; i < cells.length; i++){
    for(var j = 0; j < cells.length; j++){
      cells[i][j].innerHTML = "";
    }
  }
}

// clear table contents before initGame is called to change game size
function clearTable(){
  rows = [];
  cells = [];
  while(ticTacTable.rows.length > 0){
    ticTacTable.deleteRow(-1);
  }
}

function setStatusMessage(){
  // status div
  var status = document.getElementById("status");
  var player;
  switch(turn){
    case PLAYER_O:
      player = "O";
      break;
    case PLAYER_X:
      player = "X";
      break;
    default:
      player = null;
  }
  var statusString = "It is " + player + "'s turn.";
  status.innerHTML = statusString;
}
