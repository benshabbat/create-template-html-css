// Counter Application with History

let counter = 0;
const counterValue = document.getElementById('counterValue');
const incrementBtn = document.getElementById('incrementBtn');
const decrementBtn = document.getElementById('decrementBtn');
const resetBtn = document.getElementById('resetBtn');
const stepSelect = document.getElementById('stepSize');
const historyList = document.getElementById('historyList');

// Get step size
function getStepSize() {
    return parseInt(stepSelect.value);
}

// Update display
function updateDisplay() {
    counterValue.textContent = counter;
    
    // Change color based on value
    const display = counterValue.parentElement;
    if (counter > 0) {
        display.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
    } else if (counter < 0) {
        display.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
    } else {
        display.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
}

// Add to history
function addToHistory(action, value) {
    const now = new Date().toLocaleTimeString();
    const item = document.createElement('div');
    item.className = 'history-item';
    item.textContent = `${now} - ${action} (${value > 0 ? '+' : ''}${value})`;
    
    // Remove empty message if exists
    if (historyList.querySelector('.empty')) {
        historyList.innerHTML = '';
    }
    
    historyList.insertBefore(item, historyList.firstChild);
    
    // Keep only last 10 items
    while (historyList.children.length > 10) {
        historyList.removeChild(historyList.lastChild);
    }
}

// Increment
function increment() {
    const step = getStepSize();
    counter += step;
    updateDisplay();
    addToHistory('Increment', step);
}

// Decrement
function decrement() {
    const step = getStepSize();
    counter -= step;
    updateDisplay();
    addToHistory('Decrement', -step);
}

// Reset
function reset() {
    const oldValue = counter;
    counter = 0;
    updateDisplay();
    addToHistory('Reset', -oldValue);
}

// Event listeners
incrementBtn.addEventListener('click', increment);
decrementBtn.addEventListener('click', decrement);
resetBtn.addEventListener('click', reset);

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' || e.key === '+') increment();
    if (e.key === 'ArrowDown' || e.key === '-') decrement();
    if (e.key === '0' || e.key === 'r') reset();
});

// Initialize
updateDisplay();
