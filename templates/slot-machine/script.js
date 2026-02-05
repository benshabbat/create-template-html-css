// Game state
let gameState = {
    credits: parseInt(localStorage.getItem('slotCredits')) || 1000,
    bet: 10,
    spinning: false,
    totalWins: parseInt(localStorage.getItem('slotTotalWins')) || 0
};

// Symbols with weights (lower weight = rarer = higher payout)
const symbols = [
    { icon: '🍒', weight: 30, payout: 3 },
    { icon: '🍋', weight: 25, payout: 5 },
    { icon: '🍊', weight: 20, payout: 7 },
    { icon: '🍇', weight: 15, payout: 10 },
    { icon: '🔔', weight: 10, payout: 15 },
    { icon: '💎', weight: 8, payout: 25 },
    { icon: '⭐', weight: 5, payout: 50 },
    { icon: '💰', weight: 2, payout: 100 }
];

// Get random symbol based on weight
function getRandomSymbol() {
    const totalWeight = symbols.reduce((sum, s) => sum + s.weight, 0);
    let random = Math.random() * totalWeight;
    
    for (let symbol of symbols) {
        random -= symbol.weight;
        if (random <= 0) {
            return symbol;
        }
    }
    
    return symbols[0]; // Fallback
}

// Update display
function updateDisplay() {
    document.getElementById('credits').textContent = gameState.credits;
    document.getElementById('bet').textContent = gameState.bet;
    document.getElementById('currentBet').textContent = gameState.bet;
}

// Increase bet
document.getElementById('increaseBet').addEventListener('click', () => {
    if (!gameState.spinning && gameState.bet < 100) {
        gameState.bet += 10;
        updateDisplay();
    }
});

// Decrease bet
document.getElementById('decreaseBet').addEventListener('click', () => {
    if (!gameState.spinning && gameState.bet > 10) {
        gameState.bet -= 10;
        updateDisplay();
    }
});

// Max bet
document.getElementById('maxBetBtn').addEventListener('click', () => {
    if (!gameState.spinning) {
        gameState.bet = 100;
        updateDisplay();
        spin();
    }
});

// Spin button
document.getElementById('spinBtn').addEventListener('click', spin);

async function spin() {
    if (gameState.spinning) return;
    
    if (gameState.credits < gameState.bet) {
        showMessage('אין מספיק קרדיטים!', 'error');
        return;
    }
    
    gameState.spinning = true;
    gameState.credits -= gameState.bet;
    updateDisplay();
    
    document.getElementById('spinBtn').disabled = true;
    document.getElementById('resultMessage').textContent = '';
    document.getElementById('winAmount').textContent = '0';
    
    // Get random symbols
    const results = [
        getRandomSymbol(),
        getRandomSymbol(),
        getRandomSymbol()
    ];
    
    // Spin animation
    await animateSpin(results);
    
    // Check for win
    checkWin(results);
    
    gameState.spinning = false;
    document.getElementById('spinBtn').disabled = false;
    
    saveGame();
    
    // Check if out of credits
    if (gameState.credits < 10) {
        setTimeout(() => {
            alert('נגמרו הקרדיטים! מקבל 1000 קרדיטים חדשים.');
            gameState.credits = 1000;
            updateDisplay();
            saveGame();
        }, 1000);
    }
}

// Animate spin
async function animateSpin(results) {
    const reels = [
        document.getElementById('reel1'),
        document.getElementById('reel2'),
        document.getElementById('reel3')
    ];
    
    // Start spinning all reels
    reels.forEach(reel => {
        reel.classList.add('spinning');
    });
    
    // Stop reels one by one with results
    for (let i = 0; i < 3; i++) {
        await new Promise(resolve => setTimeout(resolve, 800 + i * 400));
        
        const reel = reels[i];
        const symbolEl = reel.querySelector('.symbol');
        
        // Quick spin through symbols
        let spinCount = 0;
        const spinInterval = setInterval(() => {
            symbolEl.textContent = getRandomSymbol().icon;
            spinCount++;
            
            if (spinCount > 10) {
                clearInterval(spinInterval);
                symbolEl.textContent = results[i].icon;
                reel.classList.remove('spinning');
                reel.classList.add('stopped');
                
                setTimeout(() => {
                    reel.classList.remove('stopped');
                }, 300);
            }
        }, 50);
    }
    
    await new Promise(resolve => setTimeout(resolve, 300));
}

// Check win
function checkWin(results) {
    const [first, second, third] = results;
    
    // Check if all three match
    if (first.icon === second.icon && second.icon === third.icon) {
        const winAmount = gameState.bet * first.payout;
        gameState.credits += winAmount;
        gameState.totalWins += winAmount;
        
        document.getElementById('winAmount').textContent = winAmount;
        
        let message = '';
        let type = 'success';
        
        if (first.icon === '💰') {
            message = `🎉 ג'קפוט! זכית ${winAmount} קרדיטים! 🎉`;
            type = 'jackpot';
            celebrate();
        } else {
            message = `🎊 זכייה! +${winAmount} קרדיטים!`;
        }
        
        showMessage(message, type);
    } else if (first.icon === second.icon || second.icon === third.icon || first.icon === third.icon) {
        showMessage('כמעט! שני סמלים תואמים!', 'info');
    } else {
        showMessage('נסה שוב!', 'info');
    }
    
    updateDisplay();
}

// Show message
function showMessage(text, type = 'info') {
    const messageEl = document.getElementById('resultMessage');
    messageEl.textContent = text;
    messageEl.className = `result-message ${type}`;
    messageEl.style.display = 'block';
}

// Celebration animation for jackpot
function celebrate() {
    const container = document.querySelector('.slot-machine');
    container.classList.add('jackpot-celebration');
    
    // Create confetti
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            createConfetti();
        }, i * 50);
    }
    
    setTimeout(() => {
        container.classList.remove('jackpot-celebration');
    }, 3000);
}

// Create confetti
function createConfetti() {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.animationDuration = (Math.random() * 2 + 1) + 's';
    confetti.style.background = ['#FFD700', '#FF6347', '#4169E1', '#32CD32', '#FF69B4'][Math.floor(Math.random() * 5)];
    
    document.body.appendChild(confetti);
    
    setTimeout(() => {
        confetti.remove();
    }, 3000);
}

// Save game
function saveGame() {
    localStorage.setItem('slotCredits', gameState.credits);
    localStorage.setItem('slotTotalWins', gameState.totalWins);
}

// Initialize
updateDisplay();
