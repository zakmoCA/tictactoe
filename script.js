const cells = document.querySelectorAll('.cells')
let currentPlayer = '';
let declaredWinner = document.querySelector('.declare-winner')
let declareDraw = document.querySelector('.declare-draw')
let gameOver = false

const clickedCells = []

const gameBoard = {
  "1": "",
  "2": "",
  "3": "",
  "4": "",
  "5": "",
  "6": "",
  "7": "",
  "8": "",
  "9": "",
}


const winningCombos = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7]
]

// check for draw condition
function checkForDraw() {
  return winningCombos.every(combo => {
    let comboValues = combo.map(id => gameBoard[id]);
    return comboValues.includes('X') && comboValues.includes('O');
  });
}

// checks for win condition
function checkForWin() {
  for (let i = 0; i < winningCombos.length; i++) {
    let combo = winningCombos[i];
    let comboValues = combo.map(id => gameBoard[id]);
    if (comboValues.every(val => val === comboValues[0] && val !== '')) {
      currentPlayer = comboValues[0]
      console.log(`Player ${currentPlayer} is the winner!`);
      const gameWinner = document.createElement('p')
      gameWinner.setAttribute('id', 'game-winner')
      declaredWinner.appendChild(gameWinner)
      gameWinner.innerText = `Player ${currentPlayer} is the winner!`
      return true;
    }
  }
  return false;
}

function game() {
  cells.forEach(cell => {
    cell.addEventListener('click', (e) => {
      if (gameOver) return;
      const elementId = e.target.id
      if (clickedCells.includes(elementId)) {
        return;
      }

      clickedCells.push(elementId)

      if (currentPlayer === 'circle') {
        e.target.innerText = 'O'
        gameBoard[elementId] = 'O'
        currentPlayer = 'x'
      } else {
        e.target.innerText = 'X'
        gameBoard[elementId] = 'X'
        currentPlayer = 'circle'
      }

      if (checkForWin()) {
        gameOver = true;
        return;
      }

      if (checkForDraw()) {
        const draw = document.createElement('p')
        draw.setAttribute('id', 'game-draw')
        declareDraw.appendChild(draw)
        declareDraw.innerText = `The game ends in a draw!`
        gameOver = true;
        return;
      }
    })
  })
}
game()
