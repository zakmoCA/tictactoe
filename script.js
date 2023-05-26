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


function game() {
  cells.forEach(cell => {
    cell.addEventListener('click', (e) => {
      const elementId = e.target.id
      console.log(e.target.id)
      // If the cell has already been clicked, stop the function.
      if (clickedCells.includes(e.target.id)) {
        return;
      }
      if (gameOver) return
      if (!clickedCells.includes(e.target.id) && currentPlayer === '') {
        clickedCells.push(e.target.id)
        e.target.innerText = 'X'
        gameBoard[elementId] = 'X'
        currentPlayer = 'circle'
      } else if (!clickedCells.includes(e.target.id) && currentPlayer === 'circle') {
        clickedCells.push(e.target.id)
        e.target.innerText = 'O'
        gameBoard[elementId] = 'O'
        currentPlayer = 'x'
      } else if (!clickedCells.includes(e.target.id) && currentPlayer === 'x') {
        clickedCells.push(e.target.id)
        e.target.innerText = 'X'
        gameBoard[elementId] = 'X'
        currentPlayer = 'circle'
      }
      console.log(clickedCells)
      console.log(gameBoard)

      if (clickedCells.length >= 5) {
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
            gameOver = true
          }
        }
      } 
      // basic draw criteria of game ended without winner
      if (clickedCells.length >= 9 && !gameOver) {
        const draw = document.createElement('p')
        draw.setAttribute('id', 'game-draw')
        declareDraw.appendChild(draw)
        declareDraw.innerText = `The game ends in a draw!`
      }

      // draw criteria if no winning combos left
      
    })
  })
}

game()
