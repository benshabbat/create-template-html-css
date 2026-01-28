// Typing Effect Component JavaScript

class TypeWriter {
    constructor(element, text, speed = 100, deleteSpeed = 50) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.deleteSpeed = deleteSpeed;
        this.index = 0;
        this.isDeleting = false;
        this.isPaused = false;
    }

    type() {
        if (this.isPaused) return;

        const current = this.text.substring(0, this.index);
        this.element.textContent = current;

        if (!this.isDeleting && this.index < this.text.length) {
            this.index++;
            setTimeout(() => this.type(), this.speed);
        } else if (this.isDeleting && this.index > 0) {
            this.index--;
            setTimeout(() => this.type(), this.deleteSpeed);
        }
    }

    start() {
        this.type();
    }

    pause() {
        this.isPaused = true;
    }

    resume() {
        this.isPaused = false;
        this.type();
    }

    reset() {
        this.index = 0;
        this.isDeleting = false;
        this.element.textContent = '';
    }
}

// Main typing text with multiple phrases
const mainPhrases = [
    "We create stunning animations...",
    "We build modern websites...",
    "We design beautiful interfaces...",
    "We bring ideas to life..."
];

let mainPhraseIndex = 0;
let mainTyping = null;
let isPaused = false;

function typeMainText() {
    if (isPaused) return;
    
    const element = document.getElementById('typingText');
    const text = mainPhrases[mainPhraseIndex];
    
    let index = 0;
    element.textContent = '';
    
    function typeChar() {
        if (isPaused) return;
        
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(typeChar, 80);
        } else {
            setTimeout(deleteText, 2000);
        }
    }
    
    function deleteText() {
        if (isPaused) return;
        
        if (index > 0) {
            element.textContent = text.substring(0, index - 1);
            index--;
            setTimeout(deleteText, 40);
        } else {
            mainPhraseIndex = (mainPhraseIndex + 1) % mainPhrases.length;
            setTimeout(typeMainText, 500);
        }
    }
    
    typeChar();
}

// Simple typing for example cards
function typeSimpleText(element, text, speed = 100) {
    let index = 0;
    element.textContent = '';
    
    function type() {
        if (isPaused) return;
        
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Rotating text effect
const rotatingWords = ["a Developer", "a Designer", "Creative", "Innovative", "Passionate"];
let rotatingIndex = 0;

function rotateText() {
    if (isPaused) return;
    
    const element = document.getElementById('rotatingText');
    const word = rotatingWords[rotatingIndex];
    
    let index = 0;
    element.textContent = '';
    
    function typeWord() {
        if (isPaused) return;
        
        if (index < word.length) {
            element.textContent += word.charAt(index);
            index++;
            setTimeout(typeWord, 100);
        } else {
            setTimeout(deleteWord, 2000);
        }
    }
    
    function deleteWord() {
        if (isPaused) return;
        
        if (index > 0) {
            element.textContent = word.substring(0, index - 1);
            index--;
            setTimeout(deleteWord, 50);
        } else {
            rotatingIndex = (rotatingIndex + 1) % rotatingWords.length;
            setTimeout(rotateText, 500);
        }
    }
    
    typeWord();
}

// Code typing effect
const codeText = `function createAnimation() {
    const element = document.querySelector('.box');
    element.style.animation = 'fadeIn 1s ease';
    console.log('Animation started!');
}`;

function typeCode() {
    if (isPaused) return;
    
    const element = document.getElementById('codeTyping');
    let index = 0;
    element.textContent = '';
    
    function type() {
        if (isPaused) return;
        
        if (index < codeText.length) {
            element.textContent += codeText.charAt(index);
            index++;
            setTimeout(type, 50);
        }
    }
    
    type();
}

// Initialize all typing effects
function initializeTyping() {
    // Main typing text
    typeMainText();
    
    // Simple typing examples
    const simpleTyped = document.querySelector('.typed');
    if (simpleTyped) {
        const text = simpleTyped.getAttribute('data-text');
        setTimeout(() => typeSimpleText(simpleTyped, text), 500);
    }
    
    // Multi-line typing
    const typedLines = document.querySelectorAll('.typed-line');
    typedLines.forEach(line => {
        const text = line.getAttribute('data-text');
        const delay = parseInt(line.getAttribute('data-delay')) || 0;
        setTimeout(() => typeSimpleText(line, text, 80), delay);
    });
    
    // Rotating text
    setTimeout(rotateText, 1000);
    
    // Code typing
    setTimeout(typeCode, 1500);
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    initializeTyping();
    
    // Restart button
    const restartBtn = document.getElementById('restartBtn');
    if (restartBtn) {
        restartBtn.addEventListener('click', () => {
            isPaused = false;
            mainPhraseIndex = 0;
            rotatingIndex = 0;
            
            // Clear all text
            document.getElementById('typingText').textContent = '';
            document.getElementById('rotatingText').textContent = '';
            document.getElementById('codeTyping').textContent = '';
            
            document.querySelectorAll('.typed, .typed-line').forEach(el => {
                el.textContent = '';
            });
            
            // Restart animations
            initializeTyping();
        });
    }
    
    // Pause button
    const pauseBtn = document.getElementById('pauseBtn');
    if (pauseBtn) {
        pauseBtn.addEventListener('click', () => {
            isPaused = !isPaused;
            pauseBtn.textContent = isPaused ? 'Resume' : 'Pause';
        });
    }
});

console.log('Typing Effect Component initialized');
