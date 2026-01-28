// Masonry Grid Component JavaScript
console.log('Masonry Grid Component initialized');

document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const masonryItems = document.querySelectorAll('.masonry-item');

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            // Filter items with animation
            masonryItems.forEach((item, index) => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    // Show item with staggered animation
                    setTimeout(() => {
                        item.classList.remove('hidden');
                        item.style.animation = 'fadeInUp 0.6s ease forwards';
                    }, index * 50);
                } else {
                    // Hide item
                    item.style.animation = 'fadeOut 0.3s ease forwards';
                    setTimeout(() => {
                        item.classList.add('hidden');
                    }, 300);
                }
            });

            console.log('Filter applied:', filterValue);
        });
    });

    // Add click handlers to masonry items
    masonryItems.forEach(item => {
        item.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            console.log('Item clicked:', title);
            
            // Add pulse effect
            this.style.animation = 'pulse 0.5s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);

            // You can add modal or detailed view here
        });
    });

    // Like button functionality (if you want to add interactive hearts)
    const metaItems = document.querySelectorAll('.item-meta span:last-child');
    metaItems.forEach(meta => {
        meta.style.cursor = 'pointer';
        meta.addEventListener('click', function(e) {
            e.stopPropagation();
            const currentLikes = parseInt(this.textContent.match(/\d+/)[0]);
            const newLikes = currentLikes + 1;
            this.textContent = `❤️ ${newLikes}`;
            
            // Add animation
            this.style.transform = 'scale(1.3)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 300);
        });
    });

    // Intersection Observer for lazy animation
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    masonryItems.forEach(item => {
        observer.observe(item);
    });

    console.log('Total items:', masonryItems.length);
});

// Add fadeOut animation style
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-20px);
        }
    }
    
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(0.98);
        }
    }
`;
document.head.appendChild(style);
