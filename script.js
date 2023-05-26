// define game cells and state variables
const cells = document.querySelectorAll('.cells')
let currentPlayer = '';
let declaredWinner = document.querySelector('.declare-winner')
let declareDraw = document.querySelector('.declare-draw')
let gameOver = false

// initialise empty array to keep track of clicked cells
const clickedCells = []

// define gameboard object where keys represent a cells id on the gameboard
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

// define all winning combinations
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
  // check if all elements in array pass the required condition
  // draw if every winning combo has at least one 'X' and one 'O'
  const isDraw = winningCombos.every(combo => {
    let comboValues = combo.map(id => gameBoard[id]) // map each cell id in combo to its value in the gameBoard object
    return comboValues.includes('X') && comboValues.includes('O') // if true then no more winning combos available = draw
  })

  // update page to display draw message 
  if (isDraw) {
    const draw = document.createElement('p')
    draw.setAttribute('id', 'game-draw')
    declareDraw.appendChild(draw)
    declareDraw.innerText = `The game ends in a draw!`
    gameOver = true
  }

  return isDraw
}


// checks for win condition
function checkForWin() {
  for (let i = 0; i < winningCombos.length; i++) {
    let combo = winningCombos[i]
    let comboValues = combo.map(id => gameBoard[id])
    if (comboValues.every(val => val === comboValues[0] && val !== '')) { // checks if every value in winning combination is the same as the as the first value (all equal)
      currentPlayer = comboValues[0] // set winner as currentPlayer
      console.log(`Player ${currentPlayer} is the winner!`)
      const gameWinner = document.createElement('p')
      gameWinner.setAttribute('id', 'game-winner')
      declaredWinner.appendChild(gameWinner)
      gameWinner.innerText = `Player ${currentPlayer} is the winner!`
      return true
    }
  }
  return false
}

// main game function
function game() {
  cells.forEach(cell => {
    cell.addEventListener('click', (e) => {
      if (gameOver) return; // if game is over dont register clicks
      const elementId = e.target.id // get id of clicked cell
      if (clickedCells.includes(elementId)) {
        return; // if cells already been clicked we wont register the click
      }

      // add id of clicked cell to clickedCells array
      clickedCells.push(elementId)

      // depending on current player set cell to 'O' or 'X' and update gameBoard
      if (currentPlayer === 'circle') {
        e.target.innerText = 'O'
        gameBoard[elementId] = 'O'
        currentPlayer = 'x'
      } else {
        e.target.innerText = 'X'
        gameBoard[elementId] = 'X'
        currentPlayer = 'circle'
      }

      if (checkForWin() || checkForDraw()) {
        gameOver = true
        return
      }

      
    })
  })
}
game()
