// Flexbox Layout Component JavaScript
console.log('Flexbox Layout Component initialized');

document.addEventListener('DOMContentLoaded', () => {
    // Add click handlers to flex items
    const flexItems = document.querySelectorAll('.flex-item, .flex-card');
    
    flexItems.forEach(item => {
        item.addEventListener('click', function() {
            // Add pulse animation
            this.style.animation = 'pulse 0.5s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
            
            console.log('Flex item clicked:', this.textContent.trim());
        });
    });

    // Highlight layout on hover
    const layouts = document.querySelectorAll('[class*="flex-"]');
    layouts.forEach(layout => {
        layout.addEventListener('mouseenter', function() {
            this.style.outline = '2px dashed rgba(102, 126, 234, 0.3)';
            this.style.outlineOffset = '10px';
        });

        layout.addEventListener('mouseleave', function() {
            this.style.outline = 'none';
        });
    });

    // Add animation to sections on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });

    console.log('Total layouts demonstrated:', layouts.length);
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
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
