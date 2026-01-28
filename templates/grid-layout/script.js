// Grid Layout Component JavaScript
console.log('Grid Layout Component initialized');

document.addEventListener('DOMContentLoaded', () => {
    // Add intersection observer for animation on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideUp 0.8s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });

    // Add click handlers to grid items
    const gridItems = document.querySelectorAll('.grid-item, .feature-item, .auto-item');
    gridItems.forEach(item => {
        item.addEventListener('click', function() {
            this.style.animation = 'pulse 0.5s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
        });
    });

    // Sidebar navigation
    const sidebarItems = document.querySelectorAll('.sidebar li');
    sidebarItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            sidebarItems.forEach(i => i.style.fontWeight = 'normal');
            // Add active class to clicked item
            this.style.fontWeight = 'bold';
            console.log('Navigation clicked:', this.textContent);
        });
    });

    // Add hover effect sound (optional)
    const allItems = document.querySelectorAll('.grid-item, .feature-item, .auto-item, .complex-item');
    allItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });

    // Log grid layout info
    console.log('Grid items loaded:', document.querySelectorAll('.grid-item').length);
    console.log('Feature items loaded:', document.querySelectorAll('.feature-item').length);
    console.log('Auto items loaded:', document.querySelectorAll('.auto-item').length);
});

// Add pulse animation style
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(0.95);
        }
    }
`;
document.head.appendChild(style);
