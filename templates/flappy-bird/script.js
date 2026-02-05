// Game constants
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 600;

// Game state
let gameState = {
    running: false,
    score: 0,
    highScore: parseInt(localStorage.getItem('flappyHighScore')) || 0,
    gameSpeed: 2
};

// Bird
const bird = {
    x: 100,
    y: canvas.height / 2,
    width: 34,
    height: 24,
    velocity: 0,
    gravity: 0.5,
    jump: -9,
    rotation: 0
};

// Pipes
let pipes = [];
const pipeConfig = {
    width: 60,
    gap: 180,
    minHeight: 50,
    maxHeight: canvas.height - 250,
    distance: 250
};

let frameCount = 0;
let lastPipeFrame = 0;

// Background animation
let bgX = 0;

// Input handling
function handleJump() {
    if (!gameState.running) return;
    bird.velocity = bird.jump;
}

// Mouse/Touch control
canvas.addEventListener('click', handleJump);
canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    handleJump();
});

// Keyboard control
document.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'ArrowUp') {
        e.preventDefault();
        handleJump();
    }
});

// Create pipe
function createPipe() {
    const height = Math.floor(Math.random() * (pipeConfig.maxHeight - pipeConfig.minHeight)) + pipeConfig.minHeight;
    
    pipes.push({
        x: canvas.width,
        topHeight: height,
        bottomY: height + pipeConfig.gap,
        passed: false
    });
}

// Update bird
function updateBird() {
    bird.velocity += bird.gravity;
    bird.y += bird.velocity;
    
    // Rotation based on velocity
    bird.rotation = Math.min(Math.max(bird.velocity * 3, -30), 90);
    
    // Ground and ceiling collision
    if (bird.y + bird.height > canvas.height || bird.y < 0) {
        gameOver();
    }
}

// Update pipes
function updatePipes() {
    // Create new pipe
    if (frameCount - lastPipeFrame > pipeConfig.distance / gameState.gameSpeed) {
        createPipe();
        lastPipeFrame = frameCount;
    }
    
    // Update and remove pipes
    for (let i = pipes.length - 1; i >= 0; i--) {
        pipes[i].x -= gameState.gameSpeed;
        
        // Check if passed
        if (!pipes[i].passed && pipes[i].x + pipeConfig.width < bird.x) {
            pipes[i].passed = true;
            gameState.score++;
            updateScore();
            
            // Increase speed slightly
            gameState.gameSpeed += 0.05;
        }
        
        // Remove off-screen pipes
        if (pipes[i].x + pipeConfig.width < 0) {
            pipes.splice(i, 1);
        }
    }
}

// Check collision
function checkCollision() {
    for (const pipe of pipes) {
        // Check if bird is in pipe's x range
        if (bird.x + bird.width > pipe.x && bird.x < pipe.x + pipeConfig.width) {
            // Check collision with top pipe
            if (bird.y < pipe.topHeight) {
                gameOver();
                return;
            }
            // Check collision with bottom pipe
            if (bird.y + bird.height > pipe.bottomY) {
                gameOver();
                return;
            }
        }
    }
}

// Draw background
function drawBackground() {
    // Sky gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#87CEEB');
    gradient.addColorStop(1, '#E0F6FF');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Clouds
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    for (let i = 0; i < 3; i++) {
        const x = (bgX + i * 200) % canvas.width;
        drawCloud(x, 50 + i * 100);
    }
    
    // Ground
    ctx.fillStyle = '#DEB887';
    ctx.fillRect(0, canvas.height - 50, canvas.width, 50);
    
    // Grass
    ctx.fillStyle = '#90EE90';
    ctx.fillRect(0, canvas.height - 60, canvas.width, 10);
    
    bgX -= 0.5;
}

// Draw cloud
function drawCloud(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.arc(x + 25, y, 25, 0, Math.PI * 2);
    ctx.arc(x + 50, y, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
}

// Draw bird
function drawBird() {
    ctx.save();
    ctx.translate(bird.x + bird.width / 2, bird.y + bird.height / 2);
    ctx.rotate((bird.rotation * Math.PI) / 180);
    
    // Bird body
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.ellipse(0, 0, bird.width / 2, bird.height / 2, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Bird eye
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(10, -5, 6, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(12, -5, 3, 0, Math.PI * 2);
    ctx.fill();
    
    // Bird beak
    ctx.fillStyle = '#FF6347';
    ctx.beginPath();
    ctx.moveTo(15, 0);
    ctx.lineTo(25, -3);
    ctx.lineTo(25, 3);
    ctx.closePath();
    ctx.fill();
    
    // Bird wing
    ctx.fillStyle = '#FFA500';
    ctx.beginPath();
    ctx.ellipse(-5, 5, 8, 12, Math.sin(frameCount * 0.2) * 0.3, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
}

// Draw pipes
function drawPipes() {
    ctx.fillStyle = '#228B22';
    ctx.strokeStyle = '#1a6b1a';
    ctx.lineWidth = 3;
    
    for (const pipe of pipes) {
        // Top pipe
        ctx.fillRect(pipe.x, 0, pipeConfig.width, pipe.topHeight);
        ctx.strokeRect(pipe.x, 0, pipeConfig.width, pipe.topHeight);
        
        // Top pipe cap
        ctx.fillRect(pipe.x - 5, pipe.topHeight - 30, pipeConfig.width + 10, 30);
        ctx.strokeRect(pipe.x - 5, pipe.topHeight - 30, pipeConfig.width + 10, 30);
        
        // Bottom pipe
        ctx.fillRect(pipe.x, pipe.bottomY, pipeConfig.width, canvas.height - pipe.bottomY);
        ctx.strokeRect(pipe.x, pipe.bottomY, pipeConfig.width, canvas.height - pipe.bottomY);
        
        // Bottom pipe cap
        ctx.fillRect(pipe.x - 5, pipe.bottomY, pipeConfig.width + 10, 30);
        ctx.strokeRect(pipe.x - 5, pipe.bottomY, pipeConfig.width + 10, 30);
        
        // Add highlight
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.fillRect(pipe.x, 0, pipeConfig.width / 3, pipe.topHeight);
        ctx.fillRect(pipe.x, pipe.bottomY, pipeConfig.width / 3, canvas.height - pipe.bottomY);
        ctx.fillStyle = '#228B22';
    }
}

// Draw score
function drawGameScore() {
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.strokeText(gameState.score, canvas.width / 2, 80);
    ctx.fillText(gameState.score, canvas.width / 2, 80);
}

// Game over
function gameOver() {
    gameState.running = false;
    
    if (gameState.score > gameState.highScore) {
        gameState.highScore = gameState.score;
        localStorage.setItem('flappyHighScore', gameState.highScore);
        updateHighScore();
    }
    
    // Draw game over screen
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.strokeText('Game Over!', canvas.width / 2, canvas.height / 2 - 50);
    ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2 - 50);
    
    ctx.font = '24px Arial';
    ctx.strokeText(`Score: ${gameState.score}`, canvas.width / 2, canvas.height / 2 + 10);
    ctx.fillText(`Score: ${gameState.score}`, canvas.width / 2, canvas.height / 2 + 10);
    
    ctx.strokeText(`High Score: ${gameState.highScore}`, canvas.width / 2, canvas.height / 2 + 50);
    ctx.fillText(`High Score: ${gameState.highScore}`, canvas.width / 2, canvas.height / 2 + 50);
    
    ctx.font = '18px Arial';
    ctx.strokeText('Click "Reset" to restart', canvas.width / 2, canvas.height / 2 + 100);
    ctx.fillText('Click "Reset" to restart', canvas.width / 2, canvas.height / 2 + 100);
    
    document.getElementById('startBtn').disabled = false;
}

// Update UI
function updateScore() {
    document.getElementById('score').textContent = gameState.score;
}

function updateHighScore() {
    document.getElementById('highScore').textContent = gameState.highScore;
}

// Draw start screen
function drawStartScreen() {
    drawBackground();
    drawBird();
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.font = 'bold 36px Arial';
    ctx.textAlign = 'center';
    ctx.strokeText('🐦 Flappy Bird', canvas.width / 2, canvas.height / 2 - 40);
    ctx.fillText('🐦 Flappy Bird', canvas.width / 2, canvas.height / 2 - 40);
    
    ctx.font = '20px Arial';
    ctx.strokeText('Click "Start Game"', canvas.width / 2, canvas.height / 2 + 20);
    ctx.fillText('Click "Start Game"', canvas.width / 2, canvas.height / 2 + 20);
    
    ctx.strokeText('to begin!', canvas.width / 2, canvas.height / 2 + 50);
    ctx.fillText('to begin!', canvas.width / 2, canvas.height / 2 + 50);
}

// Game loop
function gameLoop() {
    if (!gameState.running) return;
    
    frameCount++;
    
    updateBird();
    updatePipes();
    checkCollision();
    
    drawBackground();
    drawPipes();
    drawBird();
    drawGameScore();
    
    requestAnimationFrame(gameLoop);
}

// Start game
function startGame() {
    gameState.running = true;
    gameState.score = 0;
    gameState.gameSpeed = 2;
    
    bird.y = canvas.height / 2;
    bird.velocity = 0;
    bird.rotation = 0;
    
    pipes = [];
    frameCount = 0;
    lastPipeFrame = 0;
    
    updateScore();
    
    document.getElementById('startBtn').disabled = true;
    
    gameLoop();
}

// Reset game
function resetGame() {
    gameState.running = false;
    gameState.score = 0;
    gameState.gameSpeed = 2;
    
    bird.y = canvas.height / 2;
    bird.velocity = 0;
    bird.rotation = 0;
    
    pipes = [];
    frameCount = 0;
    lastPipeFrame = 0;
    
    updateScore();
    
    drawStartScreen();
    
    document.getElementById('startBtn').disabled = false;
}

// Event listeners
document.getElementById('startBtn').addEventListener('click', startGame);
document.getElementById('resetBtn').addEventListener('click', resetGame);

// Initialize
updateHighScore();
drawStartScreen();
