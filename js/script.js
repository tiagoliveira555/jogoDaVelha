const cells = document.querySelectorAll(".cell");
const board = document.querySelector(".board");
const message = document.querySelector(".message");
const winner = document.querySelector(".message p");
const btnRestart = document.querySelector(".message button");

let isX;

const sequenceWinner = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const winnerVerify = (currentPlayer) => {
  return sequenceWinner.some((combination) => {
    return combination.every((index) => {
      return cells[index].classList.contains(currentPlayer);
    });
  });
};

const checkDraw = () => {
  return [...cells].every((cell) => {
    return cell.classList.contains("x") || cell.classList.contains("o");
  });
};

const startGame = () => {
  isX = true;

  cells.forEach((cell) => {
    cell.classList.remove("x");
    cell.classList.remove("o");
    cell.addEventListener("click", handleClick, { once: true });
  });

  board.classList.add("x");

  message.classList.remove("winner");
  setBoardClass();
};

const endGame = (isWin) => {
  if (isWin) {
    winner.innerHTML = isX ? "X Venceu!" : "O Venceu!";
  } else {
    winner.innerHTML = "Empate!";
  }

  message.classList.add("winner");
};

const setBoardClass = () => {
  board.classList.remove("x");
  board.classList.remove("o");

  if (isX) {
    board.classList.add("x");
  } else {
    board.classList.add("o");
  }
};

const addClassBoard = () => {
  isX = !isX;

  setBoardClass();
};

const addClassCell = (cell, classAdd) => cell.classList.add(classAdd);

const handleClick = (e) => {
  const cell = e.target;

  const classAdd = isX ? "x" : "o";

  addClassCell(cell, classAdd);

  const isWin = winnerVerify(classAdd);
  const isDraw = checkDraw();

  if (isWin) {
    endGame(true);
  } else if (isDraw) {
    endGame(false);
  } else {
    addClassBoard();
  }
};

btnRestart.addEventListener("click", startGame);

startGame();
