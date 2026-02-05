// Game constants
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const nextCanvas = document.getElementById('nextCanvas');
const nextCtx = nextCanvas.getContext('2d');

const BLOCK_SIZE = 30;
const ROWS = 20;
const COLS = 10;

canvas.width = COLS * BLOCK_SIZE;
canvas.height = ROWS * BLOCK_SIZE;
nextCanvas.width = 4 * BLOCK_SIZE;
nextCanvas.height = 4 * BLOCK_SIZE;

// Tetromino shapes
const SHAPES = {
    I: [[1, 1, 1, 1]],
    O: [[1, 1], [1, 1]],
    T: [[0, 1, 0], [1, 1, 1]],
    S: [[0, 1, 1], [1, 1, 0]],
    Z: [[1, 1, 0], [0, 1, 1]],
    J: [[1, 0, 0], [1, 1, 1]],
    L: [[0, 0, 1], [1, 1, 1]]
};

const COLORS = {
    I: '#00f0f0',
    O: '#f0f000',
    T: '#a000f0',
    S: '#00f000',
    Z: '#f00000',
    J: '#0000f0',
    L: '#f0a000'
};

// Game state
let gameState = {
    running: false,
    paused: false,
    score: 0,
    level: 1,
    lines: 0,
    highScore: parseInt(localStorage.getItem('tetrisHighScore')) || 0,
    board: [],
    currentPiece: null,
    nextPiece: null,
    dropCounter: 0,
    dropInterval: 1000,
    lastTime: 0
};

// Initialize board
function initBoard() {
    gameState.board = Array(ROWS).fill().map(() => Array(COLS).fill(0));
}

// Create new piece
function createPiece() {
    const shapes = Object.keys(SHAPES);
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
    
    return {
        shape: SHAPES[randomShape],
        color: COLORS[randomShape],
        type: randomShape,
        x: Math.floor(COLS / 2) - Math.floor(SHAPES[randomShape][0].length / 2),
        y: 0
    };
}

// Draw block
function drawBlock(x, y, color, context = ctx) {
    context.fillStyle = color;
    context.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    
    context.strokeStyle = 'rgba(0, 0, 0, 0.3)';
    context.lineWidth = 2;
    context.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    
    // Add shine effect
    context.fillStyle = 'rgba(255, 255, 255, 0.2)';
    context.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE / 2, BLOCK_SIZE / 2);
}

// Draw board
function drawBoard() {
    ctx.fillStyle = '#1a202c';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= ROWS; i++) {
        ctx.beginPath();
        ctx.moveTo(0, i * BLOCK_SIZE);
        ctx.lineTo(COLS * BLOCK_SIZE, i * BLOCK_SIZE);
        ctx.stroke();
    }
    for (let i = 0; i <= COLS; i++) {
        ctx.beginPath();
        ctx.moveTo(i * BLOCK_SIZE, 0);
        ctx.lineTo(i * BLOCK_SIZE, ROWS * BLOCK_SIZE);
        ctx.stroke();
    }
    
    // Draw placed blocks
    for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
            if (gameState.board[y][x]) {
                drawBlock(x, y, gameState.board[y][x]);
            }
        }
    }
}

// Draw piece
function drawPiece(piece, context = ctx, offsetX = 0, offsetY = 0) {
    piece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value) {
                drawBlock(piece.x + x + offsetX, piece.y + y + offsetY, piece.color, context);
            }
        });
    });
}

// Draw next piece
function drawNextPiece() {
    nextCtx.fillStyle = '#1a202c';
    nextCtx.fillRect(0, 0, nextCanvas.width, nextCanvas.height);
    
    if (gameState.nextPiece) {
        const offsetX = Math.floor((4 - gameState.nextPiece.shape[0].length) / 2);
        const offsetY = Math.floor((4 - gameState.nextPiece.shape.length) / 2);
        
        gameState.nextPiece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value) {
                    drawBlock(offsetX + x, offsetY + y, gameState.nextPiece.color, nextCtx);
                }
            });
        });
    }
}

// Check collision
function checkCollision(piece, offsetX = 0, offsetY = 0) {
    for (let y = 0; y < piece.shape.length; y++) {
        for (let x = 0; x < piece.shape[y].length; x++) {
            if (piece.shape[y][x]) {
                const newX = piece.x + x + offsetX;
                const newY = piece.y + y + offsetY;
                
                if (newX < 0 || newX >= COLS || newY >= ROWS) {
                    return true;
                }
                
                if (newY >= 0 && gameState.board[newY][newX]) {
                    return true;
                }
            }
        }
    }
    return false;
}

// Rotate piece
function rotatePiece(piece) {
    const rotated = piece.shape[0].map((_, i) =>
        piece.shape.map(row => row[i]).reverse()
    );
    
    const newPiece = { ...piece, shape: rotated };
    
    if (!checkCollision(newPiece)) {
        piece.shape = rotated;
    }
}

// Move piece
function movePiece(dx, dy) {
    if (!checkCollision(gameState.currentPiece, dx, dy)) {
        gameState.currentPiece.x += dx;
        gameState.currentPiece.y += dy;
        return true;
    }
    return false;
}

// Drop piece
function dropPiece() {
    while (movePiece(0, 1)) {}
    lockPiece();
}

// Lock piece
function lockPiece() {
    gameState.currentPiece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value) {
                const boardY = gameState.currentPiece.y + y;
                const boardX = gameState.currentPiece.x + x;
                if (boardY >= 0) {
                    gameState.board[boardY][boardX] = gameState.currentPiece.color;
                }
            }
        });
    });
    
    clearLines();
    spawnNewPiece();
}

// Clear completed lines
function clearLines() {
    let linesCleared = 0;
    
    for (let y = ROWS - 1; y >= 0; y--) {
        if (gameState.board[y].every(cell => cell !== 0)) {
            gameState.board.splice(y, 1);
            gameState.board.unshift(Array(COLS).fill(0));
            linesCleared++;
            y++; // Check the same row again
        }
    }
    
    if (linesCleared > 0) {
        gameState.lines += linesCleared;
        
        // Score calculation (Tetris scoring system)
        const points = [0, 40, 100, 300, 1200];
        gameState.score += points[linesCleared] * gameState.level;
        
        // Level up every 10 lines
        const newLevel = Math.floor(gameState.lines / 10) + 1;
        if (newLevel > gameState.level) {
            gameState.level = newLevel;
            gameState.dropInterval = Math.max(100, 1000 - (gameState.level - 1) * 100);
            updateLevel();
        }
        
        updateScore();
        updateLines();
    }
}

// Spawn new piece
function spawnNewPiece() {
    gameState.currentPiece = gameState.nextPiece || createPiece();
    gameState.nextPiece = createPiece();
    
    drawNextPiece();
    
    if (checkCollision(gameState.currentPiece)) {
        gameOver();
    }
}

// Game over
function gameOver() {
    gameState.running = false;
    
    if (gameState.score > gameState.highScore) {
        gameState.highScore = gameState.score;
        localStorage.setItem('tetrisHighScore', gameState.highScore);
        updateHighScore();
    }
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 36px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2 - 30);
    
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${gameState.score}`, canvas.width / 2, canvas.height / 2 + 10);
    
    document.getElementById('startBtn').disabled = false;
    document.getElementById('pauseBtn').disabled = true;
}

// Update UI
function updateScore() {
    document.getElementById('score').textContent = gameState.score;
}

function updateLines() {
    document.getElementById('lines').textContent = gameState.lines;
}

function updateLevel() {
    document.getElementById('level').textContent = gameState.level;
}

function updateHighScore() {
    document.getElementById('highScore').textContent = gameState.highScore;
}

// Draw game
function draw() {
    drawBoard();
    
    if (gameState.currentPiece) {
        // Draw ghost piece (shadow)
        const ghostPiece = { ...gameState.currentPiece };
        while (!checkCollision(ghostPiece, 0, 1)) {
            ghostPiece.y++;
        }
        
        ctx.globalAlpha = 0.2;
        drawPiece(ghostPiece);
        ctx.globalAlpha = 1.0;
        
        // Draw current piece
        drawPiece(gameState.currentPiece);
    }
    
    if (gameState.paused) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 28px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Game Paused', canvas.width / 2, canvas.height / 2);
    }
}

// Game loop
function gameLoop(time = 0) {
    if (!gameState.running) return;
    
    const deltaTime = time - gameState.lastTime;
    gameState.lastTime = time;
    
    if (!gameState.paused) {
        gameState.dropCounter += deltaTime;
        
        if (gameState.dropCounter > gameState.dropInterval) {
            if (!movePiece(0, 1)) {
                lockPiece();
            }
            gameState.dropCounter = 0;
        }
    }
    
    draw();
    requestAnimationFrame(gameLoop);
}

// Keyboard controls
document.addEventListener('keydown', (e) => {
    if (!gameState.running || gameState.paused) return;
    
    switch (e.key) {
        case 'ArrowLeft':
            movePiece(-1, 0);
            break;
        case 'ArrowRight':
            movePiece(1, 0);
            break;
        case 'ArrowDown':
            if (movePiece(0, 1)) {
                gameState.score += 1;
                updateScore();
            }
            gameState.dropCounter = 0;
            break;
        case 'ArrowUp':
            rotatePiece(gameState.currentPiece);
            break;
        case ' ':
            e.preventDefault();
            dropPiece();
            break;
    }
    
    draw();
});

// Start game
function startGame() {
    gameState.running = true;
    gameState.paused = false;
    gameState.score = 0;
    gameState.level = 1;
    gameState.lines = 0;
    gameState.dropCounter = 0;
    gameState.dropInterval = 1000;
    gameState.lastTime = 0;
    
    initBoard();
    gameState.nextPiece = createPiece();
    spawnNewPiece();
    
    updateScore();
    updateLines();
    updateLevel();
    
    document.getElementById('startBtn').disabled = true;
    document.getElementById('pauseBtn').disabled = false;
    
    gameLoop();
}

// Pause game
function pauseGame() {
    gameState.paused = !gameState.paused;
    document.getElementById('pauseBtn').textContent = gameState.paused ? 'Resume' : 'Pause';
}

// Reset game
function resetGame() {
    gameState.running = false;
    gameState.paused = false;
    gameState.score = 0;
    gameState.level = 1;
    gameState.lines = 0;
    
    initBoard();
    gameState.currentPiece = null;
    gameState.nextPiece = null;
    
    updateScore();
    updateLines();
    updateLevel();
    
    draw();
    drawNextPiece();
    
    document.getElementById('startBtn').disabled = false;
    document.getElementById('pauseBtn').disabled = true;
    document.getElementById('pauseBtn').textContent = 'Pause';
}

// Event listeners
document.getElementById('startBtn').addEventListener('click', startGame);
document.getElementById('pauseBtn').addEventListener('click', pauseGame);
document.getElementById('resetBtn').addEventListener('click', resetGame);

// Initialize
updateHighScore();
initBoard();
draw();
drawNextPiece();
