// Tic Tac Toe Game Logic

const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const currentPlayerDisplay = document.getElementById('currentPlayer');
const messageDisplay = document.getElementById('message');
const resetBtn = document.getElementById('resetBtn');
const resetScoreBtn = document.getElementById('resetScoreBtn');
const scoreX = document.getElementById('scoreX');
const scoreO = document.getElementById('scoreO');
const scoreDraw = document.getElementById('scoreDraw');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let scores = { X: 0, O: 0, draw: 0 };

// Winning combinations
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Initialize game
function initGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    updateCurrentPlayerDisplay();
    messageDisplay.textContent = '';
    messageDisplay.className = 'message';
    
    cells.forEach(cell => {
        cell.textContent = '';
        cell.className = 'cell';
        cell.addEventListener('click', handleCellClick);
    });
}

// Handle cell click
function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = parseInt(cell.getAttribute('data-cell'));
    
    if (gameBoard[cellIndex] !== '' || !gameActive) {
        return;
    }
    
    makeMove(cell, cellIndex);
    checkResult();
}

// Make a move
function makeMove(cell, index) {
    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(`player-${currentPlayer.toLowerCase()}`);
    cell.classList.add('taken');
}

// Check game result
function checkResult() {
    let roundWon = false;
    let winningCombination = [];
    
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            roundWon = true;
            winningCombination = [a, b, c];
            break;
        }
    }
    
    if (roundWon) {
        handleWin(winningCombination);
        return;
    }
    
    if (!gameBoard.includes('')) {
        handleDraw();
        return;
    }
    
    switchPlayer();
}

// Handle win
function handleWin(winningCombination) {
    gameActive = false;
    messageDisplay.textContent = `Player ${currentPlayer} Wins! 🎉`;
    messageDisplay.className = `message show ${currentPlayer === 'X' ? 'win-x' : 'win-o'}`;
    
    // Highlight winning cells
    winningCombination.forEach(index => {
        cells[index].classList.add('winner');
    });
    
    // Update score
    scores[currentPlayer]++;
    updateScoreDisplay();
    
    // Auto reset after 2 seconds
    setTimeout(() => {
        initGame();
    }, 2000);
}

// Handle draw
function handleDraw() {
    gameActive = false;
    messageDisplay.textContent = "It's a Draw! 🤝";
    messageDisplay.className = 'message show draw';
    
    scores.draw++;
    updateScoreDisplay();
    
    // Auto reset after 2 seconds
    setTimeout(() => {
        initGame();
    }, 2000);
}

// Switch player
function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateCurrentPlayerDisplay();
}

// Update current player display
function updateCurrentPlayerDisplay() {
    currentPlayerDisplay.textContent = currentPlayer;
    currentPlayerDisplay.className = `player-${currentPlayer.toLowerCase()}`;
}

// Update score display
function updateScoreDisplay() {
    scoreX.textContent = scores.X;
    scoreO.textContent = scores.O;
    scoreDraw.textContent = scores.draw;
}

// Reset score
function resetScore() {
    scores = { X: 0, O: 0, draw: 0 };
    updateScoreDisplay();
    initGame();
}

// Event listeners
resetBtn.addEventListener('click', initGame);
resetScoreBtn.addEventListener('click', resetScore);

// Initialize on load
initGame();
