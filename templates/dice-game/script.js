// Game state
let gameState = {
    players: [
        { total: 0, current: 0, name: 'Player 1' },
        { total: 0, current: 0, name: 'Player 2' }
    ],
    currentPlayer: 0,
    gameActive: true,
    gameMode: 'pvp', // 'pvp' or 'pvc'
    rolling: false
};

// Dice faces configuration
const diceFaces = {
    1: [{ x: 50, y: 50 }],
    2: [{ x: 25, y: 25 }, { x: 75, y: 75 }],
    3: [{ x: 25, y: 25 }, { x: 50, y: 50 }, { x: 75, y: 75 }],
    4: [{ x: 25, y: 25 }, { x: 75, y: 25 }, { x: 25, y: 75 }, { x: 75, y: 75 }],
    5: [{ x: 25, y: 25 }, { x: 75, y: 25 }, { x: 50, y: 50 }, { x: 25, y: 75 }, { x: 75, y: 75 }],
    6: [{ x: 25, y: 25 }, { x: 75, y: 25 }, { x: 25, y: 50 }, { x: 75, y: 50 }, { x: 25, y: 75 }, { x: 75, y: 75 }]
};

// Update display
function updateDisplay() {
    document.getElementById('player1Total').textContent = gameState.players[0].total;
    document.getElementById('player1Current').textContent = gameState.players[0].current;
    document.getElementById('player2Total').textContent = gameState.players[1].total;
    document.getElementById('player2Current').textContent = gameState.players[1].current;
    
    // Update active player
    const player1Card = document.getElementById('player1Card');
    const player2Card = document.getElementById('player2Card');
    
    if (gameState.currentPlayer === 0) {
        player1Card.classList.add('active');
        player2Card.classList.remove('active');
        player1Card.querySelector('.current-turn').textContent = 'Your Turn!';
        player2Card.querySelector('.current-turn').textContent = 'Wait...';
    } else {
        player1Card.classList.remove('active');
        player2Card.classList.add('active');
        player1Card.querySelector('.current-turn').textContent = 'Wait...';
        player2Card.querySelector('.current-turn').textContent = gameState.gameMode === 'pvc' ? 'Computer\'s Turn...' : 'Your Turn!';
    }
}

// Draw dice
function drawDice(number) {
    const dice = document.getElementById('dice');
    const face = dice.querySelector('.dice-face');
    
    face.innerHTML = '';
    
    const dots = diceFaces[number];
    dots.forEach(dot => {
        const dotEl = document.createElement('span');
        dotEl.className = 'dot';
        dotEl.style.left = `${dot.x}%`;
        dotEl.style.top = `${dot.y}%`;
        face.appendChild(dotEl);
    });
}

// Roll dice with animation
async function rollDice() {
    if (!gameState.gameActive || gameState.rolling) return;
    
    gameState.rolling = true;
    const dice = document.getElementById('dice');
    dice.classList.add('rolling');
    
    // Animate random numbers
    for (let i = 0; i < 10; i++) {
        drawDice(Math.floor(Math.random() * 6) + 1);
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    // Final roll
    const result = Math.floor(Math.random() * 6) + 1;
    drawDice(result);
    
    dice.classList.remove('rolling');
    gameState.rolling = false;
    
    return result;
}

// Roll button
document.getElementById('rollBtn').addEventListener('click', async () => {
    if (!gameState.gameActive || gameState.rolling) return;
    
    document.getElementById('resultMessage').textContent = '';
    
    const roll = await rollDice();
    
    if (roll === 1) {
        // Lost turn
        gameState.players[gameState.currentPlayer].current = 0;
        showMessage(`💥 Rolled 1! You lost all turn points!`, 'error');
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        switchPlayer();
    } else {
        // Add to current
        gameState.players[gameState.currentPlayer].current += roll;
        updateDisplay();
        showMessage(`🎲 Rolled ${roll}!`, 'info');
    }
});

// Hold button
document.getElementById('holdBtn').addEventListener('click', () => {
    if (!gameState.gameActive || gameState.rolling) return;
    
    const player = gameState.players[gameState.currentPlayer];
    
    if (player.current === 0) {
        showMessage('Nothing to save! Roll the dice first.', 'error');
        return;
    }
    
    player.total += player.current;
    player.current = 0;
    
    updateDisplay();
    
    // Check for win
    if (player.total >= 100) {
        endGame();
    } else {
        showMessage(`✅ Saved! ${player.total} points total.`, 'success');
        setTimeout(() => {
            switchPlayer();
        }, 1000);
    }
});

// Switch player
async function switchPlayer() {
    gameState.currentPlayer = gameState.currentPlayer === 0 ? 1 : 0;
    updateDisplay();
    document.getElementById('resultMessage').textContent = '';
    
    // Computer turn
    if (gameState.gameMode === 'pvc' && gameState.currentPlayer === 1) {
        await computerTurn();
    }
}

// Computer turn (AI)
async function computerTurn() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const player = gameState.players[1];
    const opponent = gameState.players[0];
    
    while (gameState.currentPlayer === 1 && gameState.gameActive) {
        await new Promise(resolve => setTimeout(resolve, 1200));
        
        const roll = await rollDice();
        
        if (roll === 1) {
            player.current = 0;
            showMessage(`🤖 Computer rolled 1! Lost the turn!`, 'error');
            await new Promise(resolve => setTimeout(resolve, 1500));
            switchPlayer();
            return;
        }
        
        player.current += roll;
        updateDisplay();
        showMessage(`🤖 Computer rolled ${roll}!`, 'info');
        
        // AI decision logic
        const shouldHold = 
            player.current >= 20 || // Safe threshold
            (player.total + player.current >= 100) || // Winning move
            (opponent.total >= 80 && player.current >= 15); // Defensive play
        
        if (shouldHold) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            player.total += player.current;
            player.current = 0;
            updateDisplay();
            
            if (player.total >= 100) {
                endGame();
                return;
            }
            
            showMessage(`🤖 Computer saves ${player.total} points!`, 'success');
            await new Promise(resolve => setTimeout(resolve, 1500));
            switchPlayer();
            return;
        }
    }
}

// End game
function endGame() {
    gameState.gameActive = false;
    
    const winner = gameState.players[gameState.currentPlayer];
    const winnerName = gameState.currentPlayer === 0 ? 
        'Player 1' : 
        (gameState.gameMode === 'pvc' ? 'Computer' : 'Player 2');
    
    showMessage(`🎉 ${winnerName} won with ${winner.total} points!`, 'success');
    
    // Celebrate
    celebrate();
}

// New game
document.getElementById('newGameBtn').addEventListener('click', newGame);

function newGame() {
    gameState.players = [
        { total: 0, current: 0, name: 'Player 1' },
        { total: 0, current: 0, name: 'Player 2' }
    ];
    gameState.currentPlayer = 0;
    gameState.gameActive = true;
    gameState.rolling = false;
    
    updateDisplay();
    drawDice(1);
    document.getElementById('resultMessage').textContent = '';
}

// Game mode buttons
document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        if (gameState.rolling) return;
        
        document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        gameState.gameMode = btn.dataset.mode;
        
        // Update player 2 name
        if (gameState.gameMode === 'pvc') {
            document.querySelector('#player2Card h3').textContent = '🤖 Computer';
        } else {
            document.querySelector('#player2Card h3').textContent = '👤 Player 2';
        }
        
        newGame();
    });
});

// Show message
function showMessage(text, type = 'info') {
    const messageEl = document.getElementById('resultMessage');
    messageEl.textContent = text;
    messageEl.className = `result-message ${type}`;
    messageEl.style.display = 'block';
}

// Celebration
function celebrate() {
    const card = document.getElementById(`player${gameState.currentPlayer + 1}Card`);
    card.classList.add('winner');
    
    // Confetti
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            createConfetti();
        }, i * 30);
    }
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

// Initialize
updateDisplay();
drawDice(1);
