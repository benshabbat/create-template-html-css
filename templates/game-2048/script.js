// 2048 Game Logic

const grid = document.getElementById('grid');
const scoreDisplay = document.getElementById('score');
const bestScoreDisplay = document.getElementById('bestScore');
const newGameBtn = document.getElementById('newGameBtn');
const undoBtn = document.getElementById('undoBtn');
const retryBtn = document.getElementById('retryBtn');
const gameMessage = document.getElementById('gameMessage');
const messageText = document.getElementById('messageText');

// Mobile controls
const upBtn = document.getElementById('upBtn');
const downBtn = document.getElementById('downBtn');
const leftBtn = document.getElementById('leftBtn');
const rightBtn = document.getElementById('rightBtn');

const GRID_SIZE = 4;
let board = [];
let score = 0;
let bestScore = localStorage.getItem('2048BestScore') || 0;
let previousState = null;

// Initialize game
function initGame() {
    board = Array(GRID_SIZE).fill().map(() => Array(GRID_SIZE).fill(0));
    score = 0;
    previousState = null;
    updateScore();
    hideMessage();
    addRandomTile();
    addRandomTile();
    renderBoard();
    undoBtn.disabled = true;
}

// Add random tile (2 or 4)
function addRandomTile() {
    const emptyCells = [];
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            if (board[i][j] === 0) {
                emptyCells.push({ row: i, col: j });
            }
        }
    }
    
    if (emptyCells.length > 0) {
        const { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        board[row][col] = Math.random() < 0.9 ? 2 : 4;
    }
}

// Render board
function renderBoard() {
    grid.innerHTML = '';
    
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            const tile = document.createElement('div');
            tile.className = 'tile';
            
            const value = board[i][j];
            if (value !== 0) {
                tile.textContent = value;
                tile.classList.add(`tile-${value}`);
                tile.classList.add('tile-new');
            }
            
            grid.appendChild(tile);
        }
    }
}

// Update score
function updateScore() {
    scoreDisplay.textContent = score;
    
    if (score > bestScore) {
        bestScore = score;
        localStorage.setItem('2048BestScore', bestScore);
    }
    
    bestScoreDisplay.textContent = bestScore;
}

// Save state for undo
function saveState() {
    previousState = {
        board: board.map(row => [...row]),
        score: score
    };
    undoBtn.disabled = false;
}

// Undo move
function undo() {
    if (previousState) {
        board = previousState.board.map(row => [...row]);
        score = previousState.score;
        updateScore();
        renderBoard();
        hideMessage();
        previousState = null;
        undoBtn.disabled = true;
    }
}

// Move tiles
function move(direction) {
    saveState();
    let moved = false;
    
    if (direction === 'left' || direction === 'right') {
        for (let i = 0; i < GRID_SIZE; i++) {
            const row = board[i];
            const newRow = direction === 'left' ? mergeLine(row) : mergeLine(row.reverse()).reverse();
            if (JSON.stringify(row) !== JSON.stringify(newRow)) {
                moved = true;
            }
            board[i] = newRow;
        }
    } else {
        // Transpose for up/down
        const transposed = transpose(board);
        for (let i = 0; i < GRID_SIZE; i++) {
            const row = transposed[i];
            const newRow = direction === 'up' ? mergeLine(row) : mergeLine(row.reverse()).reverse();
            if (JSON.stringify(row) !== JSON.stringify(newRow)) {
                moved = true;
            }
            transposed[i] = newRow;
        }
        board = transpose(transposed);
    }
    
    if (moved) {
        addRandomTile();
        renderBoard();
        updateScore();
        
        if (checkWin()) {
            showMessage('You Win! 🎉', true);
        } else if (checkGameOver()) {
            showMessage('Game Over! 😢', false);
        }
    } else {
        // Revert if no move was made
        previousState = null;
        undoBtn.disabled = true;
    }
}

// Merge line (left direction)
function mergeLine(line) {
    // Remove zeros
    let newLine = line.filter(val => val !== 0);
    
    // Merge same values
    for (let i = 0; i < newLine.length - 1; i++) {
        if (newLine[i] === newLine[i + 1]) {
            newLine[i] *= 2;
            score += newLine[i];
            newLine.splice(i + 1, 1);
        }
    }
    
    // Fill with zeros
    while (newLine.length < GRID_SIZE) {
        newLine.push(0);
    }
    
    return newLine;
}

// Transpose matrix
function transpose(matrix) {
    return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));
}

// Check if won (reached 2048)
function checkWin() {
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            if (board[i][j] === 2048) {
                return true;
            }
        }
    }
    return false;
}

// Check if game over
function checkGameOver() {
    // Check for empty cells
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            if (board[i][j] === 0) {
                return false;
            }
        }
    }
    
    // Check for possible merges
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            const current = board[i][j];
            if ((j < GRID_SIZE - 1 && current === board[i][j + 1]) ||
                (i < GRID_SIZE - 1 && current === board[i + 1][j])) {
                return false;
            }
        }
    }
    
    return true;
}

// Show message
function showMessage(text, isWin) {
    messageText.textContent = text;
    gameMessage.classList.add('show');
    gameMessage.classList.toggle('win', isWin);
}

// Hide message
function hideMessage() {
    gameMessage.classList.remove('show', 'win');
}

// Keyboard controls
document.addEventListener('keydown', (e) => {
    if (gameMessage.classList.contains('show')) return;
    
    switch (e.key) {
        case 'ArrowUp':
            e.preventDefault();
            move('up');
            break;
        case 'ArrowDown':
            e.preventDefault();
            move('down');
            break;
        case 'ArrowLeft':
            e.preventDefault();
            move('left');
            break;
        case 'ArrowRight':
            e.preventDefault();
            move('right');
            break;
    }
});

// Button controls
upBtn.addEventListener('click', () => move('up'));
downBtn.addEventListener('click', () => move('down'));
leftBtn.addEventListener('click', () => move('left'));
rightBtn.addEventListener('click', () => move('right'));

newGameBtn.addEventListener('click', initGame);
retryBtn.addEventListener('click', () => {
    hideMessage();
    initGame();
});
undoBtn.addEventListener('click', undo);

// Initialize on load
bestScoreDisplay.textContent = bestScore;
initGame();
