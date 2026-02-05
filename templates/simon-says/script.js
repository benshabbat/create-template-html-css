// Simon Says Game Logic

const buttons = document.querySelectorAll('.simon-button');
const startBtn = document.getElementById('startBtn');
const levelDisplay = document.getElementById('level');
const scoreDisplay = document.getElementById('score');
const bestScoreDisplay = document.getElementById('bestScore');
const messageDisplay = document.getElementById('message');
const speedSelect = document.getElementById('speed');
const soundToggle = document.getElementById('soundToggle');

let sequence = [];
let playerSequence = [];
let level = 0;
let score = 0;
let bestScore = localStorage.getItem('simonBestScore') || 0;
let isPlaying = false;
let isShowingSequence = false;

// Audio frequencies for each color
const sounds = {
    green: 329.63,  // E4
    red: 261.63,    // C4
    yellow: 392.00, // G4
    blue: 220.00    // A3
};

// Initialize
bestScoreDisplay.textContent = bestScore;

// Create audio context
let audioContext = null;

function initAudio() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
}

// Play sound
function playSound(frequency, duration = 300) {
    if (!soundToggle.checked) return;
    
    initAudio();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration / 1000);
}

// Start game
function startGame() {
    sequence = [];
    playerSequence = [];
    level = 0;
    score = 0;
    isPlaying = true;
    
    updateDisplay();
    messageDisplay.textContent = 'Watch the sequence!';
    startBtn.textContent = 'PLAYING';
    startBtn.style.pointerEvents = 'none';
    
    nextRound();
}

// Next round
function nextRound() {
    level++;
    playerSequence = [];
    
    // Add random color to sequence
    const colors = ['green', 'red', 'yellow', 'blue'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    sequence.push(randomColor);
    
    updateDisplay();
    showSequence();
}

// Show sequence
async function showSequence() {
    isShowingSequence = true;
    messageDisplay.textContent = 'Watch carefully...';
    
    const speed = parseInt(speedSelect.value);
    
    for (const color of sequence) {
        await sleep(speed);
        activateButton(color);
        await sleep(speed);
    }
    
    isShowingSequence = false;
    messageDisplay.textContent = 'Your turn!';
}

// Activate button
function activateButton(color) {
    const button = document.querySelector(`[data-color="${color}"]`);
    button.classList.add('active');
    playSound(sounds[color]);
    
    setTimeout(() => {
        button.classList.remove('active');
    }, 300);
}

// Handle player click
function handleClick(e) {
    if (!isPlaying || isShowingSequence) return;
    
    const color = e.target.dataset.color;
    if (!color) return;
    
    activateButton(color);
    playerSequence.push(color);
    
    checkSequence();
}

// Check sequence
function checkSequence() {
    const currentIndex = playerSequence.length - 1;
    
    // Check if current input matches
    if (playerSequence[currentIndex] !== sequence[currentIndex]) {
        gameOver(false);
        return;
    }
    
    // Check if sequence is complete
    if (playerSequence.length === sequence.length) {
        score += level * 10;
        updateDisplay();
        
        if (level >= 20) {
            gameOver(true);
        } else {
            messageDisplay.textContent = `Great! Level ${level} complete! 🎉`;
            setTimeout(nextRound, 1500);
        }
    }
}

// Game over
function gameOver(won) {
    isPlaying = false;
    startBtn.textContent = 'START';
    startBtn.style.pointerEvents = 'auto';
    
    if (won) {
        messageDisplay.textContent = `🎉 You Win! Perfect Score: ${score}!`;
    } else {
        messageDisplay.textContent = `Game Over! Final Score: ${score}`;
        
        // Animate wrong button
        buttons.forEach(btn => {
            btn.style.animation = 'shake 0.5s';
            setTimeout(() => btn.style.animation = '', 500);
        });
    }
    
    // Update best score
    if (score > bestScore) {
        bestScore = score;
        localStorage.setItem('simonBestScore', bestScore);
        bestScoreDisplay.textContent = bestScore;
    }
}

// Update display
function updateDisplay() {
    levelDisplay.textContent = level;
    scoreDisplay.textContent = score;
}

// Sleep utility
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Event listeners
buttons.forEach(button => button.addEventListener('click', handleClick));
startBtn.addEventListener('click', () => {
    if (!isPlaying) {
        startGame();
    }
});

// Disable speed change during game
speedSelect.addEventListener('change', () => {
    if (isPlaying) {
        speedSelect.value = speedSelect.value;
    }
});
