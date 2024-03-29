const p1 = "X";
const p2 = "O";
const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let oTurn;
const cells = document.querySelectorAll(".cells");
const endText = document.getElementById("text");
const endElement = document.getElementById("endgame");

function startGame() {
  oTurn = false;
  document.getElementById("p1").style.textDecoration = "underline";
  document.getElementById("p1").style.color = "lightblue";
  document.getElementById("p1").style.fontWeight = "600";
  
  endElement.style.display = "none";
  cells.forEach((cell) => {
    cell.innerHTML = "";
    cell.addEventListener("click", clickHandler);
  });
}

function clickHandler(e) {
  // Place marks
  const playerTurn = oTurn ? p2 : p1;
  if (e.target.innerHTML === '') {
    e.target.innerHTML = playerTurn;
    // check for win
    if (checkWin(playerTurn)) {
      endGame(false);
    } else if (isDraw()) {
    // check for draw
      endGame(true);
    } else {
    // switch turns
      changeTurns();
    }
  }  
}

function changeTurns() {
  if (oTurn) {
    document.getElementById("p1").style.textDecoration = "underline";
    document.getElementById("p1").style.color = "lightblue";
    document.getElementById("p1").style.fontWeight = "600";

    document.getElementById("p2").style.textDecoration = "none";
    document.getElementById("p2").style.color = "white";
    document.getElementById("p2").style.fontWeight = "400";
  } else {
    document.getElementById("p2").style.textDecoration = "underline";
    document.getElementById("p2").style.color = "lightblue";
    document.getElementById("p2").style.fontWeight = "600";

    document.getElementById("p1").style.textDecoration = "none";
    document.getElementById("p1").style.color = "white";
    document.getElementById("p1").style.fontWeight = "400";
  }

  oTurn = !oTurn;
}

function checkWin(playerTurn) {
  return winCombos.some((combination) => {
    return combination.every((index) => {
      return cells[index].innerHTML == playerTurn;
    });
  });
}

function endGame(draw) {
  if (draw) {
    endText.innerHTML = "It's a Tie!";
  } else {
    endText.innerHTML = `${oTurn ? 'Player Two' : 'Player One'} Wins!`;
  }

  endElement.style.display = "flex";
}

function isDraw() {
  return [...cells].every((cell) => {
    return cell.innerHTML == p1 || cell.innerHTML == p2;
  });
}

startGame();