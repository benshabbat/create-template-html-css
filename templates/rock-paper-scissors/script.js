// Rock Paper Scissors Game Logic

const choiceBtns = document.querySelectorAll('.choice-btn');
const playerScoreDisplay = document.getElementById('playerScore');
const computerScoreDisplay = document.getElementById('computerScore');
const drawScoreDisplay = document.getElementById('drawScore');
const playerChoiceDisplay = document.getElementById('playerChoice');
const computerChoiceDisplay = document.getElementById('computerChoice');
const resultMessage = document.getElementById('resultMessage');
const resetBtn = document.getElementById('resetBtn');
const gameModeSelect = document.getElementById('gameMode');

let playerScore = 0;
let computerScore = 0;
let drawScore = 0;
let gameMode = 'unlimited';
let isAnimating = false;

const choices = {
    rock: '✊',
    paper: '✋',
    scissors: '✌️'
};

const rules = {
    rock: 'scissors',
    paper: 'rock',
    scissors: 'paper'
};

// Make choice
function makeChoice(playerChoice) {
    if (isAnimating) return;
    
    // Check game mode limit
    if (checkGameEnd()) return;
    
    isAnimating = true;
    
    // Get computer choice
    const computerChoice = getComputerChoice();
    
    // Animate choices
    animateChoice(() => {
        // Show choices
        playerChoiceDisplay.textContent = choices[playerChoice];
        computerChoiceDisplay.textContent = choices[computerChoice];
        
        // Determine winner
        const result = determineWinner(playerChoice, computerChoice);
        
        // Update scores
        updateScore(result);
        
        // Show result
        showResult(result, playerChoice, computerChoice);
        
        // Check if game ended
        setTimeout(() => {
            if (checkGameEnd()) {
                showFinalResult();
            }
            isAnimating = false;
        }, 1000);
    });
}

// Get computer choice
function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    return choices[Math.floor(Math.random() * choices.length)];
}

// Animate choice
function animateChoice(callback) {
    let count = 0;
    const animationChoices = ['✊', '✋', '✌️'];
    
    const interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * animationChoices.length);
        playerChoiceDisplay.textContent = animationChoices[randomIndex];
        computerChoiceDisplay.textContent = animationChoices[randomIndex];
        
        count++;
        if (count >= 10) {
            clearInterval(interval);
            callback();
        }
    }, 100);
}

// Determine winner
function determineWinner(player, computer) {
    if (player === computer) {
        return 'draw';
    }
    
    if (rules[player] === computer) {
        return 'player';
    }
    
    return 'computer';
}

// Update score
function updateScore(result) {
    if (result === 'player') {
        playerScore++;
        playerScoreDisplay.textContent = playerScore;
    } else if (result === 'computer') {
        computerScore++;
        computerScoreDisplay.textContent = computerScore;
    } else {
        drawScore++;
        drawScoreDisplay.textContent = drawScore;
    }
}

// Show result
function showResult(result, playerChoice, computerChoice) {
    if (result === 'player') {
        resultMessage.textContent = `You Win! ${choices[playerChoice]} beats ${choices[computerChoice]}! 🎉`;
        resultMessage.className = 'result-message win';
    } else if (result === 'computer') {
        resultMessage.textContent = `You Lose! ${choices[computerChoice]} beats ${choices[playerChoice]}! 😢`;
        resultMessage.className = 'result-message lose';
    } else {
        resultMessage.textContent = `It's a Draw! Both chose ${choices[playerChoice]}! 🤝`;
        resultMessage.className = 'result-message draw';
    }
}

// Check game end
function checkGameEnd() {
    const mode = gameModeSelect.value;
    
    if (mode === 'unlimited') return false;
    
    const target = parseInt(mode.split('-')[2]);
    const totalGames = playerScore + computerScore + drawScore;
    
    // For best-of-X, winner needs to get majority
    const winsNeeded = Math.ceil(target / 2);
    
    return playerScore >= winsNeeded || computerScore >= winsNeeded || totalGames >= target;
}

// Show final result
function showFinalResult() {
    if (playerScore > computerScore) {
        resultMessage.textContent = `🏆 GAME OVER - You Win! (${playerScore}-${computerScore}) 🏆`;
        resultMessage.className = 'result-message win final';
    } else if (computerScore > playerScore) {
        resultMessage.textContent = `😢 GAME OVER - Computer Wins! (${computerScore}-${playerScore}) 😢`;
        resultMessage.className = 'result-message lose final';
    } else {
        resultMessage.textContent = `🤝 GAME OVER - It's a Tie! (${playerScore}-${computerScore}) 🤝`;
        resultMessage.className = 'result-message draw final';
    }
    
    // Disable buttons
    choiceBtns.forEach(btn => btn.disabled = true);
}

// Reset game
function resetGame() {
    playerScore = 0;
    computerScore = 0;
    drawScore = 0;
    isAnimating = false;
    
    playerScoreDisplay.textContent = '0';
    computerScoreDisplay.textContent = '0';
    drawScoreDisplay.textContent = '0';
    
    playerChoiceDisplay.textContent = '❓';
    computerChoiceDisplay.textContent = '❓';
    
    resultMessage.textContent = 'Choose your weapon!';
    resultMessage.className = 'result-message';
    
    choiceBtns.forEach(btn => btn.disabled = false);
}

// Event listeners
choiceBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const choice = btn.dataset.choice;
        makeChoice(choice);
    });
});

resetBtn.addEventListener('click', resetGame);

gameModeSelect.addEventListener('change', () => {
    if (!isAnimating) {
        resetGame();
    }
});
