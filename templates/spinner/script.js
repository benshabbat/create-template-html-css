// Loading Spinner Component JavaScript
console.log('Loading Spinner Component initialized');

// Optional: Simulate loading state
document.addEventListener('DOMContentLoaded', () => {
    console.log('All spinners are animated and ready');
});

// Example function to show/hide spinner
function showSpinner(spinnerId) {
    const spinner = document.getElementById(spinnerId);
    if (spinner) {
        spinner.style.display = 'block';
    }
}

function hideSpinner(spinnerId) {
    const spinner = document.getElementById(spinnerId);
    if (spinner) {
        spinner.style.display = 'none';
    }
}
