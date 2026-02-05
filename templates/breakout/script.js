// Game constants
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = 800;
canvas.height = 600;

// Game state
let gameState = {
    running: false,
    paused: false,
    score: 0,
    level: 1,
    lives: 3,
    highScore: parseInt(localStorage.getItem('breakoutHighScore')) || 0
};

// Paddle
const paddle = {
    width: 100,
    height: 15,
    x: canvas.width / 2 - 50,
    y: canvas.height - 30,
    speed: 8,
    dx: 0
};

// Ball
const ball = {
    radius: 8,
    x: canvas.width / 2,
    y: canvas.height / 2,
    dx: 4,
    dy: -4,
    speed: 4
};

// Bricks
const brickConfig = {
    rowCount: 5,
    columnCount: 10,
    width: 75,
    height: 20,
    padding: 5,
    offsetTop: 60,
    offsetLeft: 10
};

let bricks = [];
const brickColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];
const brickPoints = [50, 40, 30, 20, 10];

// Mouse control
let mouseX = canvas.width / 2;
canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
});

// Keyboard controls
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'Right') {
        paddle.dx = paddle.speed;
    } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
        paddle.dx = -paddle.speed;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'Right' || 
        e.key === 'ArrowLeft' || e.key === 'Left') {
        paddle.dx = 0;
    }
});

// Initialize bricks
function initBricks() {
    bricks = [];
    for (let c = 0; c < brickConfig.columnCount; c++) {
        bricks[c] = [];
        for (let r = 0; r < brickConfig.rowCount; r++) {
            bricks[c][r] = {
                x: c * (brickConfig.width + brickConfig.padding) + brickConfig.offsetLeft,
                y: r * (brickConfig.height + brickConfig.padding) + brickConfig.offsetTop,
                status: 1,
                color: brickColors[r % brickColors.length],
                points: brickPoints[r % brickPoints.length]
            };
        }
    }
}

// Draw paddle
function drawPaddle() {
    ctx.fillStyle = '#667EEA';
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#667EEA';
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.shadowBlur = 0;
}

// Draw ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#F6E05E';
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#F6E05E';
    ctx.fill();
    ctx.closePath();
    ctx.shadowBlur = 0;
}

// Draw bricks
function drawBricks() {
    for (let c = 0; c < brickConfig.columnCount; c++) {
        for (let r = 0; r < brickConfig.rowCount; r++) {
            const brick = bricks[c][r];
            if (brick.status === 1) {
                ctx.fillStyle = brick.color;
                ctx.fillRect(brick.x, brick.y, brickConfig.width, brickConfig.height);
                
                // Add border
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
                ctx.lineWidth = 2;
                ctx.strokeRect(brick.x, brick.y, brickConfig.width, brickConfig.height);
            }
        }
    }
}

// Collision detection
function collisionDetection() {
    for (let c = 0; c < brickConfig.columnCount; c++) {
        for (let r = 0; r < brickConfig.rowCount; r++) {
            const brick = bricks[c][r];
            if (brick.status === 1) {
                if (ball.x + ball.radius > brick.x &&
                    ball.x - ball.radius < brick.x + brickConfig.width &&
                    ball.y + ball.radius > brick.y &&
                    ball.y - ball.radius < brick.y + brickConfig.height) {
                    
                    ball.dy = -ball.dy;
                    brick.status = 0;
                    gameState.score += brick.points;
                    updateScore();
                    
                    // Check if all bricks are destroyed
                    if (gameState.score === getTotalPoints()) {
                        nextLevel();
                    }
                }
            }
        }
    }
}

// Get total points for current level
function getTotalPoints() {
    let total = 0;
    for (let c = 0; c < brickConfig.columnCount; c++) {
        for (let r = 0; r < brickConfig.rowCount; r++) {
            total += brickPoints[r % brickPoints.length];
        }
    }
    return total;
}

// Move paddle
function movePaddle() {
    // Mouse control (priority)
    if (mouseX) {
        paddle.x = mouseX - paddle.width / 2;
    }
    // Keyboard control
    paddle.x += paddle.dx;

    // Wall detection
    if (paddle.x < 0) {
        paddle.x = 0;
    }
    if (paddle.x + paddle.width > canvas.width) {
        paddle.x = canvas.width - paddle.width;
    }
}

// Move ball
function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Wall collision (sides)
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.dx = -ball.dx;
    }

    // Wall collision (top)
    if (ball.y - ball.radius < 0) {
        ball.dy = -ball.dy;
    }

    // Paddle collision
    if (ball.y + ball.radius > paddle.y &&
        ball.x > paddle.x &&
        ball.x < paddle.x + paddle.width) {
        
        // Change angle based on where ball hits paddle
        const hitPosition = (ball.x - paddle.x) / paddle.width;
        const angle = (hitPosition - 0.5) * Math.PI / 3;
        const speed = Math.sqrt(ball.dx * ball.dx + ball.dy * ball.dy);
        
        ball.dx = speed * Math.sin(angle);
        ball.dy = -speed * Math.cos(angle);
    }

    // Ball falls below paddle
    if (ball.y + ball.radius > canvas.height) {
        gameState.lives--;
        updateLives();
        
        if (gameState.lives === 0) {
            gameOver();
        } else {
            resetBall();
        }
    }
}

// Reset ball
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = (Math.random() > 0.5 ? 1 : -1) * ball.speed;
    ball.dy = -ball.speed;
}

// Next level
function nextLevel() {
    gameState.level++;
    ball.speed += 0.5;
    ball.dx = (Math.random() > 0.5 ? 1 : -1) * ball.speed;
    ball.dy = -ball.speed;
    
    initBricks();
    resetBall();
    updateLevel();
}

// Game over
function gameOver() {
    gameState.running = false;
    
    if (gameState.score > gameState.highScore) {
        gameState.highScore = gameState.score;
        localStorage.setItem('breakoutHighScore', gameState.highScore);
        updateHighScore();
    }
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2 - 40);
    
    ctx.font = '24px Arial';
    ctx.fillText(`Final Score: ${gameState.score}`, canvas.width / 2, canvas.height / 2 + 20);
    ctx.fillText('Click "Reset" to restart', canvas.width / 2, canvas.height / 2 + 60);
    
    document.getElementById('startBtn').disabled = false;
    document.getElementById('pauseBtn').disabled = true;
}

// Update UI
function updateScore() {
    document.getElementById('score').textContent = gameState.score;
}

function updateLives() {
    document.getElementById('lives').textContent = gameState.lives;
}

function updateLevel() {
    document.getElementById('level').textContent = gameState.level;
}

function updateHighScore() {
    document.getElementById('highScore').textContent = gameState.highScore;
}

// Draw game
function draw() {
    // Clear canvas
    ctx.fillStyle = '#1a202c';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    drawBricks();
    drawPaddle();
    drawBall();
    
    if (gameState.paused) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 36px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Game Paused', canvas.width / 2, canvas.height / 2);
    }
}

// Game loop
function gameLoop() {
    if (!gameState.running) return;
    
    if (!gameState.paused) {
        movePaddle();
        moveBall();
        collisionDetection();
    }
    
    draw();
    requestAnimationFrame(gameLoop);
}

// Start game
function startGame() {
    gameState.running = true;
    gameState.paused = false;
    gameState.score = 0;
    gameState.level = 1;
    gameState.lives = 3;
    ball.speed = 4;
    
    initBricks();
    resetBall();
    
    updateScore();
    updateLives();
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
    gameState.lives = 3;
    ball.speed = 4;
    
    initBricks();
    resetBall();
    
    updateScore();
    updateLives();
    updateLevel();
    
    draw();
    
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
initBricks();
resetBall();
draw();
