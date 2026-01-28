// Card interactions
document.querySelectorAll('.card-btn').forEach(button => {
    button.addEventListener('click', function() {
        const card = this.closest('.card');
        const title = card.querySelector('.card-title').textContent;
        console.log(`Card clicked: ${title}`);
        alert(`Clicked on: ${title}`);
    });
});
