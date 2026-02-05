// Memory Game Logic

const memoryBoard = document.getElementById('memoryBoard');
const movesDisplay = document.getElementById('moves');
const timerDisplay = document.getElementById('timer');
const matchesDisplay = document.getElementById('matches');
const messageDisplay = document.getElementById('message');
const resetBtn = document.getElementById('resetBtn');
const difficultyBtn = document.getElementById('difficultyBtn');
const difficultySelector = document.getElementById('difficultySelector');
const difficultyBtns = document.querySelectorAll('.difficulty-btn');

// Game symbols
const symbols = ['🎮', '🎯', '🎨', '🎭', '🎪', '🎬', '🎸', '🎺', '⚽', '🏀', '🎾', '🏈'];

let difficulty = 'easy';
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let timer = 0;
let timerInterval = null;
let canFlip = true;

// Difficulty settings
const difficultySettings = {
    easy: { pairs: 8, gridCols: 4 },
    medium: { pairs: 10, gridCols: 5 },
    hard: { pairs: 12, gridCols: 6 }
};

// Initialize game
function initGame() {
    clearInterval(timerInterval);
    const settings = difficultySettings[difficulty];
    const pairsCount = settings.pairs;
    
    // Reset stats
    moves = 0;
    matchedPairs = 0;
    timer = 0;
    flippedCards = [];
    canFlip = true;
    
    updateStats();
    messageDisplay.textContent = '';
    messageDisplay.className = 'message';
    
    // Create card deck
    const selectedSymbols = symbols.slice(0, pairsCount);
    const cardSymbols = [...selectedSymbols, ...selectedSymbols];
    shuffleArray(cardSymbols);
    
    // Create board
    memoryBoard.innerHTML = '';
    memoryBoard.style.gridTemplateColumns = `repeat(${settings.gridCols}, 1fr)`;
    
    cards = cardSymbols.map((symbol, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.symbol = symbol;
        card.dataset.index = index;
        
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">?</div>
                <div class="card-back">${symbol}</div>
            </div>
        `;
        
        card.addEventListener('click', () => handleCardClick(card));
        memoryBoard.appendChild(card);
        
        return card;
    });
    
    // Start timer on first click
    let firstClick = true;
    cards.forEach(card => {
        card.addEventListener('click', () => {
            if (firstClick) {
                startTimer();
                firstClick = false;
            }
        }, { once: true });
    });
}

// Handle card click
function handleCardClick(card) {
    if (!canFlip || card.classList.contains('flipped') || card.classList.contains('matched')) {
        return;
    }
    
    // Flip card
    card.classList.add('flipped');
    flippedCards.push(card);
    
    // Check if two cards are flipped
    if (flippedCards.length === 2) {
        canFlip = false;
        moves++;
        updateStats();
        
        setTimeout(() => checkMatch(), 800);
    }
}

// Check if cards match
function checkMatch() {
    const [card1, card2] = flippedCards;
    const symbol1 = card1.dataset.symbol;
    const symbol2 = card2.dataset.symbol;
    
    if (symbol1 === symbol2) {
        // Match found
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;
        updateStats();
        
        // Check if game is won
        if (matchedPairs === difficultySettings[difficulty].pairs) {
            handleWin();
        }
    } else {
        // No match - flip back
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }, 400);
    }
    
    flippedCards = [];
    canFlip = true;
}

// Handle win
function handleWin() {
    clearInterval(timerInterval);
    messageDisplay.textContent = `🎉 You Won! Time: ${formatTime(timer)}, Moves: ${moves}`;
    messageDisplay.className = 'message show win';
    
    // Celebration animation
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.animation = 'bounce 0.5s ease';
        }, index * 50);
    });
}

// Start timer
function startTimer() {
    timerInterval = setInterval(() => {
        timer++;
        updateStats();
    }, 1000);
}

// Update stats display
function updateStats() {
    movesDisplay.textContent = moves;
    timerDisplay.textContent = formatTime(timer);
    matchesDisplay.textContent = `${matchedPairs}/${difficultySettings[difficulty].pairs}`;
}

// Format time
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Shuffle array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Toggle difficulty selector
function toggleDifficultySelector() {
    difficultySelector.classList.toggle('show');
}

// Change difficulty
function changeDifficulty(newDifficulty) {
    difficulty = newDifficulty;
    
    // Update active button
    difficultyBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.difficulty === difficulty);
    });
    
    difficultySelector.classList.remove('show');
    initGame();
}

// Event listeners
resetBtn.addEventListener('click', initGame);
difficultyBtn.addEventListener('click', toggleDifficultySelector);

difficultyBtns.forEach(btn => {
    btn.addEventListener('click', () => changeDifficulty(btn.dataset.difficulty));
});

// Close difficulty selector when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.difficulty-selector') && !e.target.closest('#difficultyBtn')) {
        difficultySelector.classList.remove('show');
    }
});

// Initialize on load
initGame();
