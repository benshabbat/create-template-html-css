// Tabs Component

const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

// Switch tab
function switchTab(e) {
    const button = e.currentTarget;
    const tabId = button.getAttribute('data-tab');
    
    // Remove active class from all buttons
    tabButtons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    button.classList.add('active');
    
    // Hide all content
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Show selected content
    const selectedContent = document.getElementById(tabId);
    if (selectedContent) {
        selectedContent.classList.add('active');
    }
}

// Add event listeners
tabButtons.forEach(button => {
    button.addEventListener('click', switchTab);
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    const activeButton = document.querySelector('.tab-button.active');
    const activeIndex = Array.from(tabButtons).indexOf(activeButton);
    
    if (e.key === 'ArrowRight') {
        e.preventDefault();
        const nextIndex = (activeIndex + 1) % tabButtons.length;
        tabButtons[nextIndex].click();
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevIndex = (activeIndex - 1 + tabButtons.length) % tabButtons.length;
        tabButtons[prevIndex].click();
    }
});
