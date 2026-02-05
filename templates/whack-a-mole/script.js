// Whack-a-Mole Game Logic

const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const highScoreDisplay = document.getElementById('highScore');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const messageDisplay = document.getElementById('message');
const difficultySelect = document.getElementById('difficulty');

let score = 0;
let timeLeft = 30;
let highScore = localStorage.getItem('whackHighScore') || 0;
let gameInterval = null;
let moleInterval = null;
let isPaused = false;
let isGameActive = false;

// Difficulty settings
const difficulties = {
    easy: { minTime: 800, maxTime: 1500 },
    medium: { minTime: 500, maxTime: 1200 },
    hard: { minTime: 300, maxTime: 800 }
};

// Initialize
highScoreDisplay.textContent = highScore;

// Start game
function startGame() {
    score = 0;
    timeLeft = 30;
    isPaused = false;
    isGameActive = true;
    
    scoreDisplay.textContent = score;
    timerDisplay.textContent = timeLeft;
    messageDisplay.textContent = '';
    
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    difficultySelect.disabled = true;
    
    // Hide all moles
    moles.forEach(mole => mole.classList.remove('up', 'whacked'));
    
    // Start timer
    gameInterval = setInterval(() => {
        if (!isPaused) {
            timeLeft--;
            timerDisplay.textContent = timeLeft;
            
            if (timeLeft <= 0) {
                endGame();
            }
        }
    }, 1000);
    
    // Start spawning moles
    spawnMole();
}

// Spawn mole
function spawnMole() {
    if (!isGameActive) return;
    
    const difficulty = difficultySelect.value;
    const { minTime, maxTime } = difficulties[difficulty];
    
    // Random hole
    const randomHole = Math.floor(Math.random() * holes.length);
    const mole = moles[randomHole];
    
    // Check if already up
    if (mole.classList.contains('up')) {
        spawnMole();
        return;
    }
    
    // Show mole
    mole.classList.add('up');
    
    // Random time to stay up
    const upTime = Math.random() * (maxTime - minTime) + minTime;
    
    setTimeout(() => {
        if (mole.classList.contains('up') && !mole.classList.contains('whacked')) {
            mole.classList.remove('up');
        }
        
        // Spawn next mole
        if (isGameActive && !isPaused) {
            const spawnDelay = Math.random() * 300 + 200;
            setTimeout(spawnMole, spawnDelay);
        }
    }, upTime);
}

// Whack mole
function whack(e) {
    if (!isGameActive || isPaused) return;
    
    const mole = e.target;
    
    if (mole.classList.contains('up') && !mole.classList.contains('whacked')) {
        mole.classList.add('whacked');
        score++;
        scoreDisplay.textContent = score;
        
        // Shake animation
        mole.style.animation = 'shake 0.3s';
        
        setTimeout(() => {
            mole.classList.remove('up', 'whacked');
            mole.style.animation = '';
        }, 300);
    }
}

// Pause game
function pauseGame() {
    isPaused = !isPaused;
    
    if (isPaused) {
        pauseBtn.textContent = 'Resume';
        messageDisplay.textContent = 'Game Paused';
    } else {
        pauseBtn.textContent = 'Pause';
        messageDisplay.textContent = '';
        spawnMole();
    }
}

// End game
function endGame() {
    clearInterval(gameInterval);
    isGameActive = false;
    
    // Hide all moles
    moles.forEach(mole => mole.classList.remove('up', 'whacked'));
    
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    pauseBtn.textContent = 'Pause';
    difficultySelect.disabled = false;
    
    // Update high score
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('whackHighScore', highScore);
        highScoreDisplay.textContent = highScore;
        messageDisplay.textContent = `🎉 New High Score: ${score}!`;
    } else {
        messageDisplay.textContent = `Game Over! Final Score: ${score}`;
    }
    
    messageDisplay.classList.add('show');
}

// Event listeners
moles.forEach(mole => mole.addEventListener('click', whack));
startBtn.addEventListener('click', startGame);
pauseBtn.addEventListener('click', pauseGame);

// Prevent text selection on double click
document.addEventListener('selectstart', (e) => {
    if (isGameActive) {
        e.preventDefault();
    }
});
