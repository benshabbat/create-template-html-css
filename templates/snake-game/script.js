// Snake Game Logic

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('highScore');
const speedDisplay = document.getElementById('speed');
const messageDisplay = document.getElementById('message');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const upBtn = document.getElementById('upBtn');
const downBtn = document.getElementById('downBtn');
const leftBtn = document.getElementById('leftBtn');
const rightBtn = document.getElementById('rightBtn');

// Game constants
const GRID_SIZE = 20;
const CELL_SIZE = canvas.width / GRID_SIZE;

// Game state
let snake = [];
let food = {};
let direction = 'right';
let nextDirection = 'right';
let score = 0;
let highScore = localStorage.getItem('snakeHighScore') || 0;
let gameLoop = null;
let gameSpeed = 150;
let isPaused = false;
let isGameOver = false;

// Initialize game
function initGame() {
    snake = [
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 }
    ];
    direction = 'right';
    nextDirection = 'right';
    score = 0;
    gameSpeed = 150;
    isPaused = false;
    isGameOver = false;
    
    updateScore();
    updateSpeed();
    spawnFood();
    draw();
    
    messageDisplay.textContent = 'Press SPACE or tap Start to begin';
    messageDisplay.className = 'message';
    startBtn.disabled = false;
    pauseBtn.disabled = true;
}

// Start game
function startGame() {
    if (gameLoop || isPaused) return;
    
    messageDisplay.textContent = '';
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    
    gameLoop = setInterval(() => {
        update();
        draw();
    }, gameSpeed);
}

// Pause game
function pauseGame() {
    if (isGameOver) return;
    
    isPaused = !isPaused;
    
    if (isPaused) {
        clearInterval(gameLoop);
        gameLoop = null;
        messageDisplay.textContent = 'PAUSED - Press SPACE or Resume';
        messageDisplay.className = 'message show';
        pauseBtn.textContent = 'Resume';
        startBtn.disabled = false;
    } else {
        startGame();
        messageDisplay.textContent = '';
        pauseBtn.textContent = 'Pause';
        startBtn.disabled = true;
    }
}

// Reset game
function resetGame() {
    clearInterval(gameLoop);
    gameLoop = null;
    initGame();
}

// Update game state
function update() {
    direction = nextDirection;
    
    // Calculate new head position
    const head = { ...snake[0] };
    
    switch (direction) {
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++;
            break;
        case 'left':
            head.x--;
            break;
        case 'right':
            head.x++;
            break;
    }
    
    // Check collision with walls
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        gameOver();
        return;
    }
    
    // Check collision with self
    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        gameOver();
        return;
    }
    
    // Add new head
    snake.unshift(head);
    
    // Check if food eaten
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        updateScore();
        spawnFood();
        increaseSpeed();
    } else {
        snake.pop();
    }
}

// Draw everything
function draw() {
    // Clear canvas
    ctx.fillStyle = '#1f2937';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 1;
    for (let i = 0; i <= GRID_SIZE; i++) {
        ctx.beginPath();
        ctx.moveTo(i * CELL_SIZE, 0);
        ctx.lineTo(i * CELL_SIZE, canvas.height);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(0, i * CELL_SIZE);
        ctx.lineTo(canvas.width, i * CELL_SIZE);
        ctx.stroke();
    }
    
    // Draw snake
    snake.forEach((segment, index) => {
        if (index === 0) {
            // Head
            ctx.fillStyle = '#10b981';
        } else {
            // Body
            ctx.fillStyle = '#34d399';
        }
        ctx.fillRect(
            segment.x * CELL_SIZE + 1,
            segment.y * CELL_SIZE + 1,
            CELL_SIZE - 2,
            CELL_SIZE - 2
        );
    });
    
    // Draw food
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(
        food.x * CELL_SIZE + CELL_SIZE / 2,
        food.y * CELL_SIZE + CELL_SIZE / 2,
        CELL_SIZE / 2 - 2,
        0,
        Math.PI * 2
    );
    ctx.fill();
}

// Spawn food
function spawnFood() {
    do {
        food = {
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE)
        };
    } while (snake.some(segment => segment.x === food.x && segment.y === food.y));
}

// Change direction
function changeDirection(newDirection) {
    // Prevent 180 degree turns
    if (
        (newDirection === 'up' && direction !== 'down') ||
        (newDirection === 'down' && direction !== 'up') ||
        (newDirection === 'left' && direction !== 'right') ||
        (newDirection === 'right' && direction !== 'left')
    ) {
        nextDirection = newDirection;
    }
}

// Increase speed
function increaseSpeed() {
    if (gameSpeed > 50) {
        gameSpeed -= 5;
        clearInterval(gameLoop);
        if (!isPaused) {
            gameLoop = setInterval(() => {
                update();
                draw();
            }, gameSpeed);
        }
        updateSpeed();
    }
}

// Update score
function updateScore() {
    scoreDisplay.textContent = score;
    
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('snakeHighScore', highScore);
        highScoreDisplay.textContent = highScore;
    } else {
        highScoreDisplay.textContent = highScore;
    }
}

// Update speed display
function updateSpeed() {
    if (gameSpeed > 100) {
        speedDisplay.textContent = 'Normal';
    } else if (gameSpeed > 60) {
        speedDisplay.textContent = 'Fast';
    } else {
        speedDisplay.textContent = 'Very Fast';
    }
}

// Game over
function gameOver() {
    clearInterval(gameLoop);
    gameLoop = null;
    isGameOver = true;
    
    messageDisplay.textContent = `Game Over! Final Score: ${score}`;
    messageDisplay.className = 'message show game-over';
    
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    pauseBtn.textContent = 'Pause';
}

// Keyboard controls
document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
            e.preventDefault();
            changeDirection('up');
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            e.preventDefault();
            changeDirection('down');
            break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
            e.preventDefault();
            changeDirection('left');
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            e.preventDefault();
            changeDirection('right');
            break;
        case ' ':
            e.preventDefault();
            if (!gameLoop && !isPaused) {
                startGame();
            } else if (!isGameOver) {
                pauseGame();
            }
            break;
    }
});

// Button controls
upBtn.addEventListener('click', () => changeDirection('up'));
downBtn.addEventListener('click', () => changeDirection('down'));
leftBtn.addEventListener('click', () => changeDirection('left'));
rightBtn.addEventListener('click', () => changeDirection('right'));

startBtn.addEventListener('click', () => {
    if (isGameOver) {
        resetGame();
    }
    startGame();
});
pauseBtn.addEventListener('click', pauseGame);
resetBtn.addEventListener('click', resetGame);

// Touch swipe controls
let touchStartX = 0;
let touchStartY = 0;

canvas.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

canvas.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0) {
            changeDirection('right');
        } else {
            changeDirection('left');
        }
    } else {
        if (deltaY > 0) {
            changeDirection('down');
        } else {
            changeDirection('up');
        }
    }
});

// Initialize on load
initGame();
