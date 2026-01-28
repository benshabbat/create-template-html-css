// Animated Cards Component JavaScript
console.log('Animated Cards Component initialized');

// Add 3D tilt effect on mouse move for tilt card
document.addEventListener('DOMContentLoaded', () => {
    const tiltCard = document.querySelector('.tilt-card');
    
    if (tiltCard) {
        tiltCard.addEventListener('mousemove', (e) => {
            const rect = tiltCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            tiltCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        tiltCard.addEventListener('mouseleave', () => {
            tiltCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    }
    
    // Add click handlers to all buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            console.log('Button clicked:', btn.textContent);
            // Add your custom action here
        });
    });
});
