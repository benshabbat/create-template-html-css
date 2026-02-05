// Guess the Number Game Logic

const guessInput = document.getElementById('guessInput');
const guessBtn = document.getElementById('guessBtn');
const newGameBtn = document.getElementById('newGameBtn');
const giveUpBtn = document.getElementById('giveUpBtn');
const attemptsDisplay = document.getElementById('attempts');
const bestScoreDisplay = document.getElementById('bestScore');
const rangeDisplay = document.getElementById('rangeDisplay');
const hintBox = document.getElementById('hintBox');
const hintText = document.getElementById('hintText');
const hintDetails = document.getElementById('hintDetails');
const guessHistory = document.getElementById('guessHistory');
const difficultyBtns = document.querySelectorAll('.difficulty-btn');

let targetNumber = 0;
let attempts = 0;
let maxRange = 100;
let guesses = [];
let bestScores = {
    100: localStorage.getItem('bestScore100') || null,
    500: localStorage.getItem('bestScore500') || null,
    1000: localStorage.getItem('bestScore1000') || null
};
let gameActive = true;

// Initialize game
function initGame() {
    targetNumber = Math.floor(Math.random() * maxRange) + 1;
    attempts = 0;
    guesses = [];
    gameActive = true;
    
    updateDisplay();
    guessInput.value = '';
    guessInput.disabled = false;
    guessBtn.disabled = false;
    guessInput.focus();
    
    hintBox.className = 'hint-box';
    hintText.textContent = "I'm thinking of a number...";
    hintDetails.textContent = 'Make your first guess!';
    
    guessHistory.innerHTML = '<p class="empty-state">No guesses yet</p>';
}

// Make a guess
function makeGuess() {
    if (!gameActive) return;
    
    const guess = parseInt(guessInput.value);
    
    // Validate input
    if (isNaN(guess) || guess < 1 || guess > maxRange) {
        showHint('invalid', '⚠️ Invalid Input', `Please enter a number between 1 and ${maxRange}`);
        return;
    }
    
    // Check if already guessed
    if (guesses.includes(guess)) {
        showHint('duplicate', '🔄 Already Guessed', 'You already tried this number!');
        return;
    }
    
    attempts++;
    guesses.push(guess);
    updateDisplay();
    addToHistory(guess);
    
    // Check if correct
    if (guess === targetNumber) {
        handleWin();
    } else if (guess < targetNumber) {
        const diff = targetNumber - guess;
        if (diff <= 5) {
            showHint('hot', '🔥 Very Hot!', 'You\'re super close! Go higher!');
        } else if (diff <= 10) {
            showHint('warm', '🌡️ Hot!', 'Getting closer! Go higher!');
        } else if (diff <= 20) {
            showHint('cool', '❄️ Warm', 'Go higher!');
        } else {
            showHint('cold', '🧊 Cold', 'Too low! Go much higher!');
        }
    } else {
        const diff = guess - targetNumber;
        if (diff <= 5) {
            showHint('hot', '🔥 Very Hot!', 'You\'re super close! Go lower!');
        } else if (diff <= 10) {
            showHint('warm', '🌡️ Hot!', 'Getting closer! Go lower!');
        } else if (diff <= 20) {
            showHint('cool', '❄️ Warm', 'Go lower!');
        } else {
            showHint('cold', '🧊 Cold', 'Too high! Go much lower!');
        }
    }
    
    guessInput.value = '';
    guessInput.focus();
}

// Handle win
function handleWin() {
    gameActive = false;
    guessInput.disabled = true;
    guessBtn.disabled = true;
    
    showHint('win', '🎉 Congratulations!', `You found it in ${attempts} attempts!`);
    
    // Update best score
    if (!bestScores[maxRange] || attempts < bestScores[maxRange]) {
        bestScores[maxRange] = attempts;
        localStorage.setItem(`bestScore${maxRange}`, attempts);
        bestScoreDisplay.textContent = attempts;
        
        // Show new record message
        setTimeout(() => {
            hintDetails.textContent = `🏆 New Record: ${attempts} attempts!`;
        }, 1500);
    }
}

// Give up
function giveUp() {
    if (!gameActive) return;
    
    gameActive = false;
    guessInput.disabled = true;
    guessBtn.disabled = true;
    
    showHint('give-up', '😔 Game Over', `The number was ${targetNumber}`);
}

// Show hint
function showHint(type, title, details) {
    hintBox.className = `hint-box ${type}`;
    hintText.textContent = title;
    hintDetails.textContent = details;
    
    // Animate
    hintBox.style.animation = 'none';
    setTimeout(() => {
        hintBox.style.animation = 'bounceIn 0.5s ease';
    }, 10);
}

// Add to history
function addToHistory(guess) {
    if (guesses.length === 1) {
        guessHistory.innerHTML = '';
    }
    
    const guessItem = document.createElement('div');
    guessItem.className = 'guess-item';
    
    let icon = '';
    if (guess === targetNumber) {
        icon = '🎯';
        guessItem.classList.add('correct');
    } else if (Math.abs(guess - targetNumber) <= 5) {
        icon = '🔥';
    } else if (Math.abs(guess - targetNumber) <= 10) {
        icon = '🌡️';
    } else if (Math.abs(guess - targetNumber) <= 20) {
        icon = '❄️';
    } else {
        icon = '🧊';
    }
    
    guessItem.innerHTML = `
        <span class="guess-number">${guess}</span>
        <span class="guess-icon">${icon}</span>
    `;
    
    guessHistory.prepend(guessItem);
}

// Update display
function updateDisplay() {
    attemptsDisplay.textContent = attempts;
    bestScoreDisplay.textContent = bestScores[maxRange] || '-';
    rangeDisplay.textContent = `1 - ${maxRange}`;
    guessInput.setAttribute('max', maxRange);
    guessInput.setAttribute('placeholder', `Enter number (1-${maxRange})`);
}

// Change difficulty
function changeDifficulty(newRange) {
    maxRange = parseInt(newRange);
    
    // Update active button
    difficultyBtns.forEach(btn => {
        btn.classList.toggle('active', parseInt(btn.dataset.range) === maxRange);
    });
    
    initGame();
}

// Event listeners
guessBtn.addEventListener('click', makeGuess);
newGameBtn.addEventListener('click', initGame);
giveUpBtn.addEventListener('click', giveUp);

guessInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        makeGuess();
    }
});

difficultyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        changeDifficulty(btn.dataset.range);
    });
});

// Initialize on load
initGame();
