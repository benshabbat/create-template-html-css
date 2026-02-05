// Game state
let gameState = {
    credits: parseInt(localStorage.getItem('blackjackCredits')) || 1000,
    currentBet: 0,
    wins: parseInt(localStorage.getItem('blackjackWins')) || 0,
    deck: [],
    playerHand: [],
    dealerHand: [],
    gameActive: false,
    dealerTurn: false
};

// Card suits and values
const suits = ['♠', '♥', '♦', '♣'];
const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const suitColors = { '♠': 'black', '♥': 'red', '♦': 'red', '♣': 'black' };

// Initialize deck
function createDeck() {
    const deck = [];
    for (let suit of suits) {
        for (let value of values) {
            deck.push({ suit, value });
        }
    }
    return deck;
}

// Shuffle deck
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

// Deal card
function dealCard() {
    if (gameState.deck.length < 10) {
        gameState.deck = shuffleDeck(createDeck());
    }
    return gameState.deck.pop();
}

// Calculate hand value
function calculateHandValue(hand) {
    let value = 0;
    let aces = 0;

    for (let card of hand) {
        if (card.value === 'A') {
            aces++;
            value += 11;
        } else if (['J', 'Q', 'K'].includes(card.value)) {
            value += 10;
        } else {
            value += parseInt(card.value);
        }
    }

    // Adjust for aces
    while (value > 21 && aces > 0) {
        value -= 10;
        aces--;
    }

    return value;
}

// Check for blackjack
function isBlackjack(hand) {
    return hand.length === 2 && calculateHandValue(hand) === 21;
}

// Render card
function renderCard(card, hidden = false) {
    const cardEl = document.createElement('div');
    cardEl.className = 'card';
    
    if (hidden) {
        cardEl.classList.add('card-back');
        cardEl.innerHTML = `
            <div class="card-pattern">🂠</div>
        `;
    } else {
        cardEl.classList.add('card-front');
        const color = suitColors[card.suit];
        cardEl.style.color = color;
        cardEl.innerHTML = `
            <div class="card-corner top-left">
                <div class="card-value">${card.value}</div>
                <div class="card-suit">${card.suit}</div>
            </div>
            <div class="card-center">${card.suit}</div>
            <div class="card-corner bottom-right">
                <div class="card-value">${card.value}</div>
                <div class="card-suit">${card.suit}</div>
            </div>
        `;
    }
    
    // Add animation
    setTimeout(() => cardEl.classList.add('dealt'), 10);
    
    return cardEl;
}

// Update display
function updateDisplay() {
    document.getElementById('credits').textContent = gameState.credits;
    document.getElementById('bet').textContent = gameState.currentBet;
    document.getElementById('wins').textContent = gameState.wins;
    
    // Update scores
    const playerValue = calculateHandValue(gameState.playerHand);
    document.getElementById('playerScore').textContent = playerValue;
    
    if (gameState.dealerTurn) {
        const dealerValue = calculateHandValue(gameState.dealerHand);
        document.getElementById('dealerScore').textContent = dealerValue;
    } else {
        document.getElementById('dealerScore').textContent = gameState.dealerHand.length > 0 ? '?' : '0';
    }
}

// Render hands
function renderHands(revealDealer = false) {
    const playerHandEl = document.getElementById('playerHand');
    const dealerHandEl = document.getElementById('dealerHand');
    
    playerHandEl.innerHTML = '';
    dealerHandEl.innerHTML = '';
    
    // Render player hand
    gameState.playerHand.forEach(card => {
        playerHandEl.appendChild(renderCard(card));
    });
    
    // Render dealer hand
    gameState.dealerHand.forEach((card, index) => {
        const hideCard = index === 0 && !revealDealer;
        dealerHandEl.appendChild(renderCard(card, hideCard));
    });
    
    updateDisplay();
}

// Handle bet
document.querySelectorAll('.bet-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const amount = parseInt(btn.dataset.amount);
        
        if (gameState.credits >= amount) {
            gameState.currentBet += amount;
            updateDisplay();
            document.getElementById('dealBtn').disabled = false;
        } else {
            showMessage('אין מספיק קרדיטים!', 'error');
        }
    });
});

// Start game
document.getElementById('dealBtn').addEventListener('click', startGame);

function startGame() {
    if (gameState.currentBet === 0) {
        showMessage('בחר הימור תחילה!', 'error');
        return;
    }
    
    // Deduct bet from credits
    gameState.credits -= gameState.currentBet;
    
    // Initialize
    gameState.deck = shuffleDeck(createDeck());
    gameState.playerHand = [];
    gameState.dealerHand = [];
    gameState.gameActive = true;
    gameState.dealerTurn = false;
    
    // Deal initial cards
    gameState.playerHand.push(dealCard());
    gameState.dealerHand.push(dealCard());
    gameState.playerHand.push(dealCard());
    gameState.dealerHand.push(dealCard());
    
    renderHands();
    
    // Hide betting, show actions
    document.getElementById('bettingArea').style.display = 'none';
    document.getElementById('actionButtons').style.display = 'flex';
    document.getElementById('resultMessage').textContent = '';
    document.getElementById('nextRoundBtn').style.display = 'none';
    
    // Check for blackjacks
    if (isBlackjack(gameState.playerHand)) {
        if (isBlackjack(gameState.dealerHand)) {
            endGame('push'); // Both have blackjack
        } else {
            endGame('blackjack'); // Player blackjack
        }
    }
    
    updateDisplay();
    saveGame();
}

// Hit
document.getElementById('hitBtn').addEventListener('click', () => {
    if (!gameState.gameActive) return;
    
    gameState.playerHand.push(dealCard());
    renderHands();
    
    const playerValue = calculateHandValue(gameState.playerHand);
    
    if (playerValue > 21) {
        endGame('bust');
    } else if (playerValue === 21) {
        stand();
    }
    
    // Disable double after hit
    document.getElementById('doubleBtn').disabled = true;
});

// Stand
document.getElementById('standBtn').addEventListener('click', stand);

function stand() {
    if (!gameState.gameActive) return;
    
    gameState.dealerTurn = true;
    document.getElementById('actionButtons').style.display = 'none';
    
    renderHands(true);
    
    // Dealer's turn
    dealerPlay();
}

// Double down
document.getElementById('doubleBtn').addEventListener('click', () => {
    if (!gameState.gameActive) return;
    
    if (gameState.credits >= gameState.currentBet) {
        gameState.credits -= gameState.currentBet;
        gameState.currentBet *= 2;
        updateDisplay();
        
        gameState.playerHand.push(dealCard());
        renderHands();
        
        const playerValue = calculateHandValue(gameState.playerHand);
        
        if (playerValue > 21) {
            endGame('bust');
        } else {
            stand();
        }
    } else {
        showMessage('אין מספיק קרדיטים להכפלה!', 'error');
    }
});

// Dealer play
async function dealerPlay() {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    while (calculateHandValue(gameState.dealerHand) < 17) {
        await new Promise(resolve => setTimeout(resolve, 800));
        gameState.dealerHand.push(dealCard());
        renderHands(true);
    }
    
    const playerValue = calculateHandValue(gameState.playerHand);
    const dealerValue = calculateHandValue(gameState.dealerHand);
    
    if (dealerValue > 21) {
        endGame('win');
    } else if (dealerValue > playerValue) {
        endGame('lose');
    } else if (dealerValue < playerValue) {
        endGame('win');
    } else {
        endGame('push');
    }
}

// End game
function endGame(result) {
    gameState.gameActive = false;
    gameState.dealerTurn = true;
    renderHands(true);
    
    let message = '';
    let winAmount = 0;
    
    switch (result) {
        case 'blackjack':
            winAmount = Math.floor(gameState.currentBet * 2.5); // 3:2 payout
            message = '🎉 BLACKJACK! אתה מנצח!';
            gameState.wins++;
            break;
        case 'win':
            winAmount = gameState.currentBet * 2;
            message = '🎉 ניצחת!';
            gameState.wins++;
            break;
        case 'lose':
            message = '😢 הפסדת!';
            break;
        case 'push':
            winAmount = gameState.currentBet;
            message = '🤝 תיקו!';
            break;
        case 'bust':
            message = '💥 עברת את 21! הפסדת!';
            break;
    }
    
    gameState.credits += winAmount;
    
    if (winAmount > 0) {
        message += ` (+${winAmount})`;
    }
    
    showMessage(message, result === 'lose' || result === 'bust' ? 'error' : 'success');
    
    document.getElementById('nextRoundBtn').style.display = 'block';
    
    updateDisplay();
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

// Next round
document.getElementById('nextRoundBtn').addEventListener('click', () => {
    gameState.currentBet = 0;
    gameState.playerHand = [];
    gameState.dealerHand = [];
    
    document.getElementById('bettingArea').style.display = 'block';
    document.getElementById('actionButtons').style.display = 'none';
    document.getElementById('nextRoundBtn').style.display = 'none';
    document.getElementById('dealBtn').disabled = true;
    document.getElementById('doubleBtn').disabled = false;
    document.getElementById('resultMessage').textContent = '';
    
    renderHands();
    updateDisplay();
});

// Show message
function showMessage(text, type = 'info') {
    const messageEl = document.getElementById('resultMessage');
    messageEl.textContent = text;
    messageEl.className = `result-message ${type}`;
    messageEl.style.display = 'block';
}

// Save game
function saveGame() {
    localStorage.setItem('blackjackCredits', gameState.credits);
    localStorage.setItem('blackjackWins', gameState.wins);
}

// Initialize
updateDisplay();
renderHands();
