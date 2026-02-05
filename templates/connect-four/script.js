// Game constants
const ROWS = 6;
const COLS = 7;
const PLAYER1 = 1;
const PLAYER2 = 2;

// Game state
let gameState = {
    board: [],
    currentPlayer: PLAYER1,
    gameOver: false,
    gameMode: 'pvp', // 'pvp' or 'pvc'
    difficulty: 'medium',
    score1: parseInt(localStorage.getItem('connect4Score1')) || 0,
    score2: parseInt(localStorage.getItem('connect4Score2')) || 0,
    isAnimating: false
};

// Initialize board
function initBoard() {
    gameState.board = Array(ROWS).fill().map(() => Array(COLS).fill(0));
    gameState.currentPlayer = PLAYER1;
    gameState.gameOver = false;
    renderBoard();
    updateTurnIndicator();
}

// Render board
function renderBoard() {
    const boardElement = document.getElementById('gameBoard');
    boardElement.innerHTML = '';
    
    for (let col = 0; col < COLS; col++) {
        const column = document.createElement('div');
        column.className = 'column';
        column.dataset.col = col;
        
        // Add hover effect
        column.addEventListener('mouseenter', () => {
            if (!gameState.gameOver && !gameState.isAnimating) {
                column.classList.add('hover');
            }
        });
        
        column.addEventListener('mouseleave', () => {
            column.classList.remove('hover');
        });
        
        column.addEventListener('click', () => handleColumnClick(col));
        
        for (let row = 0; row < ROWS; row++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = row;
            cell.dataset.col = col;
            
            const disc = document.createElement('div');
            disc.className = 'disc';
            
            const value = gameState.board[row][col];
            if (value === PLAYER1) {
                disc.classList.add('player1');
            } else if (value === PLAYER2) {
                disc.classList.add('player2');
            }
            
            cell.appendChild(disc);
            column.appendChild(cell);
        }
        
        boardElement.appendChild(column);
    }
}

// Handle column click
async function handleColumnClick(col) {
    if (gameState.gameOver || gameState.isAnimating) return;
    
    const row = getLowestEmptyRow(col);
    if (row === -1) return; // Column is full
    
    gameState.isAnimating = true;
    
    // Place disc with animation
    await placeDisc(row, col, gameState.currentPlayer);
    
    // Check for win or draw
    if (checkWin(row, col)) {
        await highlightWinningDiscs();
        endGame(gameState.currentPlayer);
        gameState.isAnimating = false;
        return;
    }
    
    if (isBoardFull()) {
        endGame(0); // Draw
        gameState.isAnimating = false;
        return;
    }
    
    // Switch player
    gameState.currentPlayer = gameState.currentPlayer === PLAYER1 ? PLAYER2 : PLAYER1;
    updateTurnIndicator();
    
    gameState.isAnimating = false;
    
    // Computer's turn
    if (gameState.gameMode === 'pvc' && gameState.currentPlayer === PLAYER2) {
        await computerMove();
    }
}

// Get lowest empty row in column
function getLowestEmptyRow(col) {
    for (let row = ROWS - 1; row >= 0; row--) {
        if (gameState.board[row][col] === 0) {
            return row;
        }
    }
    return -1;
}

// Place disc with animation
function placeDisc(row, col, player) {
    return new Promise((resolve) => {
        gameState.board[row][col] = player;
        
        const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
        const disc = cell.querySelector('.disc');
        
        // Add class for animation
        disc.classList.add(player === PLAYER1 ? 'player1' : 'player2');
        disc.classList.add('dropping');
        
        // Calculate drop distance
        const dropDistance = (ROWS - row) * 70; // 70px per row
        disc.style.setProperty('--drop-distance', `${dropDistance}px`);
        
        setTimeout(() => {
            disc.classList.remove('dropping');
            resolve();
        }, 500);
    });
}

// Check win
function checkWin(row, col) {
    const player = gameState.board[row][col];
    
    // Check horizontal
    if (checkDirection(row, col, 0, 1, player) ||
        checkDirection(row, col, 0, -1, player)) {
        return true;
    }
    
    // Check vertical
    if (checkDirection(row, col, 1, 0, player)) {
        return true;
    }
    
    // Check diagonal /
    if (checkDirection(row, col, 1, 1, player) ||
        checkDirection(row, col, -1, -1, player)) {
        return true;
    }
    
    // Check diagonal \
    if (checkDirection(row, col, 1, -1, player) ||
        checkDirection(row, col, -1, 1, player)) {
        return true;
    }
    
    return false;
}

// Check direction
function checkDirection(row, col, dRow, dCol, player) {
    let count = 1; // Count current disc
    const winningDiscs = [[row, col]];
    
    // Check positive direction
    for (let i = 1; i < 4; i++) {
        const newRow = row + dRow * i;
        const newCol = col + dCol * i;
        
        if (newRow < 0 || newRow >= ROWS || newCol < 0 || newCol >= COLS) break;
        if (gameState.board[newRow][newCol] !== player) break;
        
        count++;
        winningDiscs.push([newRow, newCol]);
    }
    
    // Check negative direction
    for (let i = 1; i < 4; i++) {
        const newRow = row - dRow * i;
        const newCol = col - dCol * i;
        
        if (newRow < 0 || newRow >= ROWS || newCol < 0 || newCol >= COLS) break;
        if (gameState.board[newRow][newCol] !== player) break;
        
        count++;
        winningDiscs.push([newRow, newCol]);
    }
    
    if (count >= 4) {
        gameState.winningDiscs = winningDiscs;
        return true;
    }
    
    return false;
}

// Highlight winning discs
function highlightWinningDiscs() {
    return new Promise((resolve) => {
        gameState.winningDiscs.forEach(([row, col]) => {
            const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
            const disc = cell.querySelector('.disc');
            disc.classList.add('winning');
        });
        
        setTimeout(resolve, 500);
    });
}

// Check if board is full
function isBoardFull() {
    return gameState.board[0].every(cell => cell !== 0);
}

// Computer move
async function computerMove() {
    gameState.isAnimating = true;
    
    // Add thinking delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let col;
    
    switch (gameState.difficulty) {
        case 'easy':
            col = getRandomMove();
            break;
        case 'medium':
            col = Math.random() < 0.5 ? getBestMove() : getRandomMove();
            break;
        case 'hard':
            col = getBestMove();
            break;
    }
    
    const row = getLowestEmptyRow(col);
    if (row === -1) {
        gameState.isAnimating = false;
        return computerMove(); // Try again
    }
    
    await placeDisc(row, col, PLAYER2);
    
    if (checkWin(row, col)) {
        await highlightWinningDiscs();
        endGame(PLAYER2);
        gameState.isAnimating = false;
        return;
    }
    
    if (isBoardFull()) {
        endGame(0);
        gameState.isAnimating = false;
        return;
    }
    
    gameState.currentPlayer = PLAYER1;
    updateTurnIndicator();
    gameState.isAnimating = false;
}

// Get random move
function getRandomMove() {
    const availableCols = [];
    for (let col = 0; col < COLS; col++) {
        if (getLowestEmptyRow(col) !== -1) {
            availableCols.push(col);
        }
    }
    return availableCols[Math.floor(Math.random() * availableCols.length)];
}

// Get best move (simple AI)
function getBestMove() {
    // Try to win
    for (let col = 0; col < COLS; col++) {
        const row = getLowestEmptyRow(col);
        if (row !== -1) {
            gameState.board[row][col] = PLAYER2;
            if (checkWin(row, col)) {
                gameState.board[row][col] = 0;
                return col;
            }
            gameState.board[row][col] = 0;
        }
    }
    
    // Block opponent's win
    for (let col = 0; col < COLS; col++) {
        const row = getLowestEmptyRow(col);
        if (row !== -1) {
            gameState.board[row][col] = PLAYER1;
            if (checkWin(row, col)) {
                gameState.board[row][col] = 0;
                return col;
            }
            gameState.board[row][col] = 0;
        }
    }
    
    // Prefer center column
    if (getLowestEmptyRow(3) !== -1) {
        return 3;
    }
    
    // Random move
    return getRandomMove();
}

// End game
function endGame(winner) {
    gameState.gameOver = true;
    
    if (winner === PLAYER1) {
        gameState.score1++;
        localStorage.setItem('connect4Score1', gameState.score1);
        updateScore();
        showMessage('🎉 Player 1 wins!', 'player1');
    } else if (winner === PLAYER2) {
        gameState.score2++;
        localStorage.setItem('connect4Score2', gameState.score2);
        updateScore();
        const message = gameState.gameMode === 'pvc' ? '🤖 Computer wins!' : '🎉 Player 2 wins!';
        showMessage(message, 'player2');
    } else {
        showMessage('🤝 Draw!', 'draw');
    }
}

// Show message
function showMessage(text, type) {
    const turnIndicator = document.getElementById('turnIndicator');
    turnIndicator.textContent = text;
    turnIndicator.className = `message ${type}`;
}

// Update turn indicator
function updateTurnIndicator() {
    const turnIndicator = document.getElementById('turnIndicator');
    if (gameState.currentPlayer === PLAYER1) {
        turnIndicator.textContent = 'Player 1\'s Turn';
        turnIndicator.className = 'player1-turn';
    } else {
        const text = gameState.gameMode === 'pvc' ? 'Computer\'s Turn' : 'Player 2\'s Turn';
        turnIndicator.textContent = text;
        turnIndicator.className = 'player2-turn';
    }
}

// Update score
function updateScore() {
    document.getElementById('score1').textContent = gameState.score1;
    document.getElementById('score2').textContent = gameState.score2;
}

// New game
function newGame() {
    initBoard();
}

// Reset score
function resetScore() {
    gameState.score1 = 0;
    gameState.score2 = 0;
    localStorage.setItem('connect4Score1', 0);
    localStorage.setItem('connect4Score2', 0);
    updateScore();
}

// Game mode change
document.querySelectorAll('input[name="gameMode"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
        gameState.gameMode = e.target.value;
        const difficultySelector = document.querySelector('.difficulty-selector');
        
        if (gameState.gameMode === 'pvc') {
            difficultySelector.style.display = 'flex';
        } else {
            difficultySelector.style.display = 'none';
        }
        
        newGame();
    });
});

// Difficulty change
document.getElementById('difficulty').addEventListener('change', (e) => {
    gameState.difficulty = e.target.value;
});

// Event listeners
document.getElementById('newGameBtn').addEventListener('click', newGame);
document.getElementById('resetScoreBtn').addEventListener('click', resetScore);

// Initialize
updateScore();
initBoard();
