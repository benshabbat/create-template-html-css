// Canvas setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 500;

// Game state
let gameState = {
    running: false,
    paused: false,
    gameMode: 'pvc', // 'pvc' or 'pvp'
    difficulty: 'medium',
    score1: 0,
    score2: 0,
    winningScore: 10
};

// Paddle properties
const paddleWidth = 12;
const paddleHeight = 80;
const paddleSpeed = 6;

const paddle1 = {
    x: 20,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    dy: 0
};

const paddle2 = {
    x: canvas.width - 20 - paddleWidth,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    dy: 0
};

// Ball properties
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 8,
    dx: 5,
    dy: 5,
    speed: 5
};

// AI settings
const aiSettings = {
    easy: { speed: 0.5, accuracy: 0.6 },
    medium: { speed: 0.7, accuracy: 0.8 },
    hard: { speed: 0.9, accuracy: 0.95 },
    impossible: { speed: 1.2, accuracy: 1 }
};

// Keyboard state
const keys = {
    w: false,
    s: false,
    ArrowUp: false,
    ArrowDown: false
};

// Event listeners
document.addEventListener('keydown', (e) => {
    if (e.key in keys) {
        keys[e.key] = true;
    }
    if (e.key === ' ' && gameState.running && !gameState.paused) {
        pauseGame();
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key in keys) {
        keys[e.key] = false;
    }
});

// Game mode selection
document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        gameState.gameMode = btn.dataset.mode;
        
        // Update player 2 name
        if (gameState.gameMode === 'pvc') {
            document.getElementById('player2Name').textContent = '🤖 Computer';
            document.querySelector('.difficulty-selector').style.display = 'flex';
        } else {
            document.getElementById('player2Name').textContent = '👤 Player 2';
            document.querySelector('.difficulty-selector').style.display = 'none';
        }
    });
});

// Difficulty selection
document.getElementById('difficulty').addEventListener('change', (e) => {
    gameState.difficulty = e.target.value;
});

// Reset ball
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    
    // Random direction
    const angle = (Math.random() * Math.PI / 4) - Math.PI / 8;
    const direction = Math.random() < 0.5 ? 1 : -1;
    
    ball.dx = Math.cos(angle) * ball.speed * direction;
    ball.dy = Math.sin(angle) * ball.speed;
}

// Update paddles
function updatePaddles() {
    // Player 1
    if (keys.w && paddle1.y > 0) {
        paddle1.y -= paddleSpeed;
    }
    if (keys.s && paddle1.y < canvas.height - paddle1.height) {
        paddle1.y += paddleSpeed;
    }
    
    // Player 2 / AI
    if (gameState.gameMode === 'pvc') {
        updateAI();
    } else {
        if (keys.ArrowUp && paddle2.y > 0) {
            paddle2.y -= paddleSpeed;
        }
        if (keys.ArrowDown && paddle2.y < canvas.height - paddle2.height) {
            paddle2.y += paddleSpeed;
        }
    }
}

// AI logic
function updateAI() {
    const ai = aiSettings[gameState.difficulty];
    const paddleCenter = paddle2.y + paddle2.height / 2;
    const targetY = ball.y;
    
    // Add some randomness for realism
    const errorMargin = (1 - ai.accuracy) * paddle2.height;
    const target = targetY + (Math.random() - 0.5) * errorMargin;
    
    if (paddleCenter < target - 10) {
        paddle2.y += paddleSpeed * ai.speed;
    } else if (paddleCenter > target + 10) {
        paddle2.y -= paddleSpeed * ai.speed;
    }
    
    // Keep in bounds
    paddle2.y = Math.max(0, Math.min(canvas.height - paddle2.height, paddle2.y));
}

// Update ball
function updateBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;
    
    // Top and bottom collision
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.dy = -ball.dy;
    }
    
    // Paddle 1 collision
    if (ball.x - ball.radius < paddle1.x + paddle1.width &&
        ball.x + ball.radius > paddle1.x &&
        ball.y > paddle1.y &&
        ball.y < paddle1.y + paddle1.height) {
        
        // Calculate hit position
        const hitPos = (ball.y - paddle1.y) / paddle1.height - 0.5;
        ball.dy = hitPos * ball.speed * 2;
        ball.dx = Math.abs(ball.dx) * 1.05; // Speed up
        ball.speed *= 1.02;
    }
    
    // Paddle 2 collision
    if (ball.x + ball.radius > paddle2.x &&
        ball.x - ball.radius < paddle2.x + paddle2.width &&
        ball.y > paddle2.y &&
        ball.y < paddle2.y + paddle2.height) {
        
        const hitPos = (ball.y - paddle2.y) / paddle2.height - 0.5;
        ball.dy = hitPos * ball.speed * 2;
        ball.dx = -Math.abs(ball.dx) * 1.05;
        ball.speed *= 1.02;
    }
    
    // Score
    if (ball.x - ball.radius < 0) {
        gameState.score2++;
        updateScore();
        checkWin();
        resetBall();
    }
    
    if (ball.x + ball.radius > canvas.width) {
        gameState.score1++;
        updateScore();
        checkWin();
        resetBall();
    }
}

// Draw everything
function draw() {
    // Clear canvas
    ctx.fillStyle = '#1a202c';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw center line
    ctx.setLineDash([10, 10]);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Draw paddles
    ctx.fillStyle = '#667EEA';
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#667EEA';
    ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
    
    ctx.fillStyle = '#F56565';
    ctx.shadowColor = '#F56565';
    ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
    
    // Draw ball
    ctx.fillStyle = '#F6E05E';
    ctx.shadowColor = '#F6E05E';
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    
    // Draw pause overlay
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
        updatePaddles();
        updateBall();
    }
    
    draw();
    requestAnimationFrame(gameLoop);
}

// Update score display
function updateScore() {
    document.getElementById('player1Score').textContent = gameState.score1;
    document.getElementById('player2Score').textContent = gameState.score2;
}

// Check win
function checkWin() {
    if (gameState.score1 >= gameState.winningScore) {
        endGame(1);
    } else if (gameState.score2 >= gameState.winningScore) {
        endGame(2);
    }
}

// End game
function endGame(winner) {
    gameState.running = false;
    
    const winnerName = winner === 1 ? 
        'Player 1' : 
        (gameState.gameMode === 'pvc' ? 'Computer' : 'Player 2');
    
    showMessage(`🎉 ${winnerName} wins ${gameState.winningScore} - ${winner === 1 ? gameState.score2 : gameState.score1}!`, 'success');
    
    document.getElementById('startBtn').disabled = false;
    document.getElementById('pauseBtn').disabled = true;
}

// Start game
document.getElementById('startBtn').addEventListener('click', startGame);

function startGame() {
    gameState.running = true;
    gameState.paused = false;
    gameState.score1 = 0;
    gameState.score2 = 0;
    ball.speed = 5;
    
    paddle1.y = canvas.height / 2 - paddleHeight / 2;
    paddle2.y = canvas.height / 2 - paddleHeight / 2;
    
    resetBall();
    updateScore();
    
    document.getElementById('startBtn').disabled = true;
    document.getElementById('pauseBtn').disabled = false;
    document.getElementById('resultMessage').textContent = '';
    
    gameLoop();
}

// Pause game
document.getElementById('pauseBtn').addEventListener('click', pauseGame);

function pauseGame() {
    gameState.paused = !gameState.paused;
    document.getElementById('pauseBtn').textContent = gameState.paused ? 'Resume' : 'Pause';
}

// Reset game
document.getElementById('resetBtn').addEventListener('click', resetGame);

function resetGame() {
    gameState.running = false;
    gameState.paused = false;
    gameState.score1 = 0;
    gameState.score2 = 0;
    ball.speed = 5;
    
    paddle1.y = canvas.height / 2 - paddleHeight / 2;
    paddle2.y = canvas.height / 2 - paddleHeight / 2;
    
    resetBall();
    updateScore();
    draw();
    
    document.getElementById('startBtn').disabled = false;
    document.getElementById('pauseBtn').disabled = true;
    document.getElementById('pauseBtn').textContent = 'Pause';
    document.getElementById('resultMessage').textContent = '';
}

// Show message
function showMessage(text, type = 'info') {
    const messageEl = document.getElementById('resultMessage');
    messageEl.textContent = text;
    messageEl.className = `result-message ${type}`;
    messageEl.style.display = 'block';
}

// Initialize
updateScore();
draw();
